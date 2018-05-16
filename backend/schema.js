const { find, filter } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const db = require('../client/src/db');
const db2 = require('./database')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
    
const signature = '@!3$%%^&1ed^&*!l@#^&***()R0441';

const typeDefs = `
  type Category {
    id: Int!
    name: String
    image_url: String
    items: [Item]
  }
   type Item {
    id: Int!
    name: String
    description: String
    price: String
    image_url: String
    unit_of_measure: String
    vendor: Vendor
    category: Category
  }
  type Vendor {
    id: Int!
    name: String
    user: User
    locations: [Location]
  }
  type Location {
    id: Int!  
    name: String!
    description: String
    vendor: Vendor
    start_time: String
    end_time: String
    address: String
    city: String 
    state: String
    zip: String
    valid_days: String
    lat: String
    lng: String
  }
  type User {
    id: Int!
    user_name: String!
    first_name: String!
    last_name: String!
    email: String!
    is_vendor: Boolean
    vendor: Vendor
    token: String
  }
  type Query {
    categories: [Category]
    items: [Item]
    category(id: Int!): Category
    locations: [Location]
    vendor(id: Int!): Vendor
    users: [User]
    vendors: [Vendor]
    item(id: Int!): Item
    me: User
    user(id: Int!): User
  }
  type Mutation {
    signup (user_name: String!, first_name: String, last_name: String, email: String, password: String!): User
    login (email: String!, password: String!): User
    createUser(first_name: String!, last_name: String!, email: String!): User!
    updateVendorStatus(id: Int!, first_name: String, last_name: String is_vendor: Boolean, email: String): String
    deleteUser(id: ID!): User!
    createVendor(id: ID!): String
  }
`;

let checkUser = (ctx) => {
    if (!ctx.user) {
        throw new Error('You are not authenticated!')
    }
}

const resolvers = {
    Query: {
        vendors: async (_, args, ctx) => await db2.query(`SELECT * FROM vendors;`), 
        categories: async (_, args, ctx) => await db2.query(`SELECT * FROM categories;`), 
        users: async (_, args, ctx) => await db2.query(`SELECT * FROM users;`), 
        items: (_, args, ctx) => db2.query(`SELECT * FROM items;`),
        user: async (_, args, ctx) => (( await db2.query(`SELECT * FROM users WHERE id = '${args.id}';`))[0]), 
            //{
            // checkUser(ctx);
            // if (ctx.user !== venderUser) {
            //     // ret all items currently for sale
            // } else {
            //     //return all venitems
            // }
            // return db.items 
            //},
        category: async (_, args, ctx) => ((await db2.query(`SELECT * FROM categories WHERE id = '${args.id}';`))[0]), 
        locations: async (_, args, ctx) => await db2.query(`SELECT * FROM locations;`), //db.locations,
        vendor: async (_, args, ctx) => ((await db2.query(`SELECT * FROM vendors WHERE id = '${args.id}';`))[0]),
        item: async (_, args, ctx) => ((await db2.query(`SELECT * FROM items WHERE id = '${args.id}';`))[0]), 
        me: async (_, args, ctx) => ((await db2.query(`SELECT * FROM users WHERE id = '${ctx.user.id}';`))[0]) 
        //{
            // Make sure user is logged in
            // user is authenticated
            //return find(db.users, { id: user.id }) 
        //}
    },
    Category: {
        items: async (category) => await db2.query(`SELECT * FROM items WHERE category_id = '${category.id}';`) // filter(db.items, { category_id: category.id })
    },
    Item: {
        category: async (item) => ((await db2.query(`SELECT * FROM categories WHERE id = '${item.category_id}';`))[0]), //find(db.categories, { id: item.category_id }),
        vendor: async  (item) => ((await db2.query(`SELECT * FROM vendors WHERE id = '${item.vendor_id}';`))[0])
    },
    Vendor: {
        locations: async (vendor) => await db2.query(`SELECT * FROM locations WHERE id = '${vendor.id}';`), //filter(db.locations, { vendor_id: vendor.id }),
        user: async (vendor) => ((await db2.query(`SELECT * FROM users WHERE id = '${vendor.user_id}';`))[0]) //find(db.users, { id: vendor.user_id })
    },
    Location: { 
        vendor: async (location) => ((await db2.query(`SELECT * FROM vendors WHERE id = '${location.vendor_id}';`))[0]) //find(db.vendors, { id: location.vendor_id })
    },
    User: {
        is_vendor: async (user) => (!!(await db2.one(`SELECT * FROM vendors WHERE user_id = '${user.id}';`))),
        vendor: async (user) => ((await db2.one(`SELECT * FROM vendors WHERE user_id = '${user.id}';`))) 

    },
    Mutation: {
        createVendor: async (_, { id}, ctx) => {
            console.log(id);
            let becomeVendor = await db2.query(`INSERT INTO vendors (user_id) 
                VALUES('${id}');`);
            // try {
            //     console.log(id);
            //     let becomeVendor = await db2.query(`INSERT INTO vendors (user_id) 
            //     VALUES('${id}');`);
            //     // update localstorage with isvendor
            // } catch (e) {
            //     console.error(e);
            // }
        },
        // Handle user signup
        signup: async (_, { user_name, first_name, last_name, email, password }) => {
            console.log('inside mutation');
            let passwordHash = await bcrypt.hash(password, 10);
            let signupQuery = await db2.query(`INSERT INTO users (user_name, first_name, last_name, email, password) 
              VALUES('${user_name}','${first_name}','${last_name}','${email}','${passwordHash}') RETURNING id;`);

            let token = jsonwebtoken.sign(
                { id: signupQuery[0].id, email: email },
                signature,
                { expiresIn: '1y' }
            )
            let payload = { token: token, 
                            is_vendor: false, 
                            id: signupQuery[0].id,  
                            user_name: user_name, 
                            email: email, 
                            first_name: first_name, 
                            last_name: last_name 
                        };
                        console.log(payload);
            return payload;
        },

        // Handles user login
        login: async (_, { email, password }, ctx) => {
            const user = ((await db2.query(`SELECT * FROM users WHERE email = '${email}';`))[0]);
            // if (!ctx.user) {
            //     throw new Error('No user with that email')
            // }
            console.log(user);
            console.log('USER!!!!!!!!')
            const valid = await bcrypt.compare(password, user.password)

            if (!valid) {
                throw new Error('Incorrect password')
            }
            // Return json web token
            let token = jsonwebtoken.sign(
                { id: user.id, email: user.email },
                signature,
                { expiresIn: '1y' }
            );

            let payload = { ...user, token, };
            console.log(payload);
            return payload
        }
    }
    
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});