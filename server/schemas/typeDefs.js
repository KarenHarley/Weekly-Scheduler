const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User!
  }

  type Task {
    _id: ID!
    name: String!
    notes: String
    day: String!
    startingTime: String!
    endingTime: String!
    user: User
    quadrant: String
    completed: Boolean
  }

  type User {
    _id: ID
    username: String
    password: String
    email: String
    tasks: [Task]
  }

  type Query {
    tasks(selectedDay: String!): [Task]
    user: User
    task(taskId: String!): Task
    duplicate(startingTime: String!, endingTime: String!, day: String!): Task
  }

  type Mutation {
    addTask(
      name: String!
      notes: String
      day: String!
      startingTime: String!
      endingTime: String!
      quadrant: String
    ): Task

    changeCompleted(
     completed: Boolean!
    ): Task

    resetCompleted(
      day: String!
    ): [Task] # change all completed to false for that day using the users id in context

    updateTask(
      name: String
      notes: String
      startingTime: String
      endingTime: String
      _id: String!
      quadrant: String
    ): Task

    updateUser(username: String, email: String, password: String): User

    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
