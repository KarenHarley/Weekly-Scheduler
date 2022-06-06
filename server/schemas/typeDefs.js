const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Auth {
    token: ID!
    user: User
  }

  type Task { 
    _id: ID!
    name: String!
    notes: String
    startingTime!
    endingTime!
    user: User!
  }

  type User {
    _id: ID
    username: String
    password: String
    tasks: [Task]
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    addTask(
      name: String!
      notes: String
      startingTime: String!
      endingTime: String!
      user: ID!
    ): Task

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
