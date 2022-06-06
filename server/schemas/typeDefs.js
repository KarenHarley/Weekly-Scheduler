const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task { 
    _id: ID!
    name: String!
    notes: String
    startingTime!
    endingTime!
  }


  type Query {
    tasks: [Task]
  }

  type Mutation {

  }
`;

module.exports = typeDefs;
