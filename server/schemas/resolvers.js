const { Task, User } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
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
    addUser: async (parent, { username, email, password }) => {
      //when user is created a token is created
      const profile = await User.create({ username, email, password }); //c in crud returning an instance
      const token = signToken(profile);

      return { token, profile }; //returning the info back to the client
    },
    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password); //checking the pass with bcryt (see user model)

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile); //authorizing
      return { token, profile };
    },
  },
};

module.exports = resolvers;
