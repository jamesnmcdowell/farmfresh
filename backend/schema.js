const { find, filter } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const db = require('../client/src/db');
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
    name: String!
    user: User!
    locations: [Location]
  }
  type Location {
    id: Int!  
    name: String!
    description: String
    vendor: Vendor
    starttime: String
    endtime: String
    address: String
    city: String 
    state: String
    zip: String
    validdays: String
    lat: String
    lng: String
  }
  type User {
    id: Int!
    username: String!
    firstname: String!
    lastname: String!
    email: String!
  }
  type Mutation {
    createUser(firstname: String!, lastname: String!, email: String!): User!
    updateUser(id: ID!, firstname: String!, lastname: String!, email: String!): User!
    deleteUser(id: ID!): User!
    createVendor(name: String!, user: String!): Vendor!
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
  }
   type Mutation {
        signup (username: String!, email: String!, password: String!): String
        login (email: String!, password: String!): String
      }
`;

let checkUser = (ctx) => {
    if (!ctx.user) {
        throw new Error('You are not authenticated!')
    }
}

const resolvers = {
    Query: {
        vendors: (_, args, ctx) => db.vendors,
        categories: (_, args, ctx) => db.categories,
        users: (_, args, ctx) => db.users,
        items: (_, args, ctx) => {
            // checkUser(ctx);
            // if (ctx.user !== venderUser) {
            //     // ret all items currently for sale
            // } else {
            //     //return all venitems
            // }
             return db.items 
            },
        category: (_, args, ctx) => find(db.categories, { id: args.id }),
        locations: (_, args, ctx) => db.locations,
        vendor: (_, args, ctx) => find(db.vendors, { id: args.id }),
        item: (_, args, ctx) => find(db.items, { id: args.id }),
        me: (_, args, ctx) => {
            // Make sure user is logged in
            
            // user is authenticated
            return find(db.users, { id: user.id }) 
        }
    },
    Category: {
        items: (category) => filter(db.items, { category_id: category.id })
    },
    Item: {
        category: (item) => find(db.categories, { id: item.category_id }),
        vendor: (item) => find(db.vendors, { id: item.vendor_id })
    },
    Vendor: {
        locations: (vendor) => filter(db.locations, { vendor_id: vendor.id }),
        user: (vendor) => find(db.users, { id: vendor.user_id })
    },
    Location: { 
        vendor: (location) => find(db.vendors, { id: location.vendor_id })
    },
    User: {

    },
    Mutation: {
        // Handle user signup
        signup: async (_, { username, email, password }) => {
            console.log('inside mutation');
            const user = await db.users.push({
                username,
                email,
                password: await bcrypt.hash(password, 10)
            })
            // Return json web token
            let token = jsonwebtoken.sign(
                { id: user.id, email: user.email },
                signature,
                { expiresIn: '1y' }
            )
            console.log("token sever");
            console.log(token);
            return token
        },

        // Handles user login
        login: async (_, { email, password }, ctx) => {
            const user = await find(db.users, { email: email}) 

            if (!ctx.user) {
                throw new Error('No user with that email')
            }

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
            console.log("token sever");
            console.log(token);
            return token
        }
    }
    
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});

