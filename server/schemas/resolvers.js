const { Task, User } = require("../models");

const resolvers = {
  Query: {
    tasks: async () => {
      return Task.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  Mutation: {
    addTask: async (parent, args) => {
      const task = await Task.create(args);
      return task;
    },
    updateTask: async (parent, args) => {
      const updatedTask = await Task.findOneAndUpdate({ args }, { new: true });
      return updatedTask;
    },
  },
};

module.exports = resolvers;
