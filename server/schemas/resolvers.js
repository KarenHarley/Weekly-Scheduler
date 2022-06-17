const { Task, User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    tasks: async (parent, { userId }) => {
      return Task.find({ user: userId }).populate("user");
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("tasks");
    },
    task: async (parent, { taskId }) => {
      console.log(taskId);
      return Task.findOne({ _id: taskId }).populate("user");
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
    login: async (parent, { email, password }) => {
      const admin = await User.findOne({ email });
      console.log(admin);

      if (!admin) {
        throw new AuthenticationError("No user found with this email address");
      }

      // const correctPw = await admin.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw new AuthenticationError("Incorrect credentials");
      // }

      const token = signToken(admin);
      console.log(token);
      console.log(admin);
      return { token, admin };
    },
  },
};

module.exports = resolvers;
