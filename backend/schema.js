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

