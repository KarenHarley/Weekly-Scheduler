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
    steps: [Step]
  }

  type Step {
    _id: ID!
    name: String!
    notes: String
    task: ID!
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
    steps(task: String!): [Step]
    user: User
    task(taskId: String!): Task
    step(stepId: String!): Step
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

    addStep(
      name: String!
      notes: String
      task: ID!
      startingTime: String!
      endingTime: String!
      user: User
      quadrant: String
      completed: Boolean
    ): Step

    changeCompleted(
     completed: Boolean!
     _id: String!
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

    updateStep(
      _id: String!
      name: String
      notes: String
      task: ID!
      startingTime: String
      endingTime: String
      quadrant: String
      completed: Boolean
    ): Step

    updateUser(username: String, email: String, password: String): User

    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
