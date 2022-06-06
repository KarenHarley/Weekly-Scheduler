const { Task, User } = require("../models");

const resolvers = {
  Query: {
    tasks: async () => {
      return Task.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('tasks');
    },
  },
  Mutation: {
    addTask: async (parent, args) => {
      const task = await Task.create(args);
      // push the id to user task
      const user = await User.findOneAndUpdate(
        {_id: args.user},
        {$push: {"tasks": task._id}}
      )
      return task;
    },
    updateTask: async (parent, args) => {
      const updatedTask = await Task.findOneAndUpdate({ args }, { new: true });
      return updatedTask;
    },
  },
};

module.exports = resolvers;
