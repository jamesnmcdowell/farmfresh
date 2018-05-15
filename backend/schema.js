const { find, filter } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const db = require('../client/src/db');
     

const typeDefs = `
  type Category {
    id: Int!
    name: String
    image_url: String
    items: [Item]
  }
   type Item {
    id: Int !
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
    name: String
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
    firstname: String
    lastname: String
    username: String!
    email: String!
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

const resolvers = {
    Query: {
        vendors: () => db.vendors,
        categories: () => db.categories,
        users: () => db.users,
        items: () => db.items,
        category: (_, args) => find(db.categories, { id: args.id }),
        locations: () => db.locations,
        vendor: (_, args) => find(db.vendors, { id: args.id }),
        item: (_, args) => find(db.items, { id: args.id }),
        me: (parent, args, ctx) => ctx.user
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

    }
    
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});