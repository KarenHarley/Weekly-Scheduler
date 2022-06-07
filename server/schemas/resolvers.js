const { Task, User } = require("../models");

const resolvers = {
  Query: {
    tasks: async (parent, { userId }) => {
      return Task.find({ user: userId }).populate("user");
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("tasks");
    },
  },
  Mutation: {
    addTask: async (parent, args) => {
      const task = await Task.create(args);
      // push the id to user task
      const user = await User.findOneAndUpdate(
        { _id: args.user },
        { $push: { tasks: task._id } }
      );
      return task;
    },
    updateTask: async (
      parent,
      { _id, name, notes, startingTime, endingTime }
    ) => {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: _id },
        { name, notes, startingTime, endingTime },
        // Return the newly updated object instead of the original
        { new: true }
      );
      return updatedTask;
    },
  },
};

module.exports = resolvers;
