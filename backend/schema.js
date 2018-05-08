const { find, filter } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
  }

  type Query {
    posts: [Post]
    author(id: Int!): Author
  }
`;

const resolvers = {
    Query: {
        posts: () => posts,
        author: (_, args) => find(authors, { id: args.id }),
    },
    Author: {
        posts: (author) => filter(posts, { authorId: author.id }),
    },
    Post: {
        author: (post) => find(authors, { id: post.authorId }),
    },
};

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL' },
    { id: 2, authorId: 2, title: 'GraphQL Rocks' },
    { id: 3, authorId: 2, title: 'Advanced GraphQL' },
    { id: 4, authorId: 3, title: 'Launchpad is Cool' },
];

const db = {
    "categories": [
        {
            "id": 1,
            "name": "Dairy"
        },
        {
            "id": 2,
            "name": "Eggs"
        },
        {
            "id": 3,
            "name": "Vegetables"
        },
        {
            "id": 4,
            "name": "Meat"
        },
        {
            "id": 5,
            "name": "Fruits"
        },
        {
            "id": 6,
            "name": "Seafood"
        },
        {
            "id": 7,
            "name": "Pantry"
        },
        {
            "id": 8,
            "name": "Personal Care"
        }
    ],
    "items": [
        {
            "quantity": 5,
            "id": 1,
            "vendor_id": 1,
            "category_id": 7,
            "image_url": "https:\/\/coxshoney.com\/wp-content\/uploads\/2012\/04\/Honey-and-Clover.jpg",
            "price": "$4.99",
            "unit_of_measure": "each",
            "description": "Strong clover nectar aroma with light amber coloring. Delicate flavor with hints of freshly cut grass and hay.",
            "name": "Clover Honey"
        },
        {
            "quantity": 10,
            "id": 2,
            "vendor_id": 1,
            "category_id": 2,
            "image_url": "http:\/\/www.hephzibahfarms.com\/wp-content\/uploads\/2015\/12\/IMG_04042.jpg",
            "price": "$6.99",
            "unit_of_measure": "dozen",
            "description": "Grade A Large eggs. Hens are free to forage and raised on grass.",
            "name": "Farm Fresh Eggs"
        },
        {
            "quantity": 10,
            "id": 3,
            "vendor_id": 1,
            "category_id": 1,
            "image_url": "http:\/\/www.theorganicdietitian.com\/wp-content\/uploads\/2013\/09\/organic-milk-bottle-590.jpg",
            "price": "$4.99",
            "unit_of_measure": "gallon",
            "description": "Raw unpasteurized milk from grass-fed cows.",
            "name": "Milk"
        },
        {
            "quantity": 10,
            "id": 4,
            "vendor_id": 1,
            "category_id": 5,
            "image_url": "http:\/\/producegeek.com\/wp-content\/uploads\/2017\/01\/organic-watermelon-02-940x626@2x.jpg",
            "price": "$3.99",
            "unit_of_measure": "pound",
            "description": "Organic and seedless.",
            "name": "Watermelon"
        },
        {
            "quantity": 10,
            "id": 5,
            "vendor_id": 1,
            "category_id": 4,
            "image_url": "https:\/\/2.bp.blogspot.com\/-YmJKLNFUjGc\/UTDwfkNM0NI\/AAAAAAAAeZw\/TvJGb0LDtLQ\/s640\/P1170947a.jpg",
            "price": "$2.99",
            "unit_of_measure": "pound",
            "description": "Hickory-smoked, thick-sliced bacon.",
            "name": "Bacon"
        }
    ],
    "locations": [
        {
            "id": 1,
            "description": "Roadside stand, all items available unless otherwise noted",
            "state": "GA",
            "zip": "30324",
            "starttime": "09:00:00",
            "endtime": "15:00:00",
            "geocode": "33.788181,-84.371338",
            "validdays": "0000011",
            "thursday": false,
            "user_id": 1,
            "friday": false,
            "saturday": true,
            "sunday": true,
            "address": "1616 Piedmont Ave NE",
            "city": "Atlanta",
            "monday": false,
            "tuesday": false,
            "wednesday": false,
            "name": "Cow Tippers"
        }
    ],
    "users": [
        {
            "email": "james@james.com",
            "id": 1,
            "password": "ABC",
            "lastname": "McDowell",
            "firstname": "James"
        },
        {
            "email": "chris@chris.com",
            "id": 2,
            "password": "ABC",
            "lastname": "Goodell",
            "firstname": "Chris"
        }
    ],
    "vendors": [
        {
            "id": 1,
            "user_id": 1,
            "images": null
        }
    ]
}