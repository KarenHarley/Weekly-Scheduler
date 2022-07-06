const { Task, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    tasks: async (parent, { selectedDay }, context) => {
      if (context.user) {
        console.log(context.user);
        return Task.find({ user: context.user._id, day: selectedDay })
          .sort({ startingTime: 1 })
          .populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("tasks");
    },
    task: async (parent, { taskId }) => {
      return Task.findOne({ _id: taskId }).populate("user");
    },
  },
  Mutation: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    addTask: async (parent, args, context) => {
      console.log(args);
      console.log(context.user);
      if (context.user) {
        //see line 23 of auth.js

        const task = await Task.create(args);
        // push the id to user task
        const thisUser = await User.findOneAndUpdate(
          { _id: args.user },
          { $push: { tasks: task._id } }
        );
        return task;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
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
      const user = await User.create({ username, email, password }); //c in crud returning an instance
      const token = signToken(user);

      return { token, user }; //returning the info back to the client
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password); //checking the pass with bcryt (see user model)

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user); //authorizing
      return { token, user };
    },
  },
};

module.exports = resolvers;
