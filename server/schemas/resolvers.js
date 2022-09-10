const { Task, User, Step } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    tasks: async (parent, { selectedDay }, context) => {
      if (context.user) {
        return Task.find({ user: context.user._id, day: selectedDay })
          .sort({ startingTime: 1 })
          .populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    steps: async (parent, { task }, context) => {
      if (context.user) {
        return Step.find({ user: context.user._id, task: task })
          .sort({ startingTime: 1 })
          .populate("task");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("tasks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    task: async (parent, { taskId }) => {
      return Task.findOne({ _id: taskId }).populate({
        path: "steps",
        options: { sort: { startingTime: 1 } },
      });
    },
    step: async (parent, { stepId }) => {
      return Step.findOne({ _id: stepId });
    },
    duplicateTask: async (parent, args, context) => {
      //use context for id
      if (context.user) {
        const duplicate = await Task.findOne({
          user: context.user._id,
          startingTime: args.startingTime,
          day: args.day,
        }).populate("user");

        //there is a message to tell if it is a full duplicate (exact times) or a half (same starting time) in front end
        return duplicate;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    duplicateStep: async (parent, args, context) => {
      //use context for id
      if (context.user) {
        const duplicate = await Step.findOne({
          user: context.user._id,
          task: args.task,
          startingTime: args.startingTime,
        });
        //add some sort of message to tell if it is a full duplicate (exact times) or a half (same starting time)
        return duplicate;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    addTask: async (parent, args, context) => {
      if (context.user) {
        //see line 23 of auth.js
        const task = await Task.create({
          name: args.name,
          notes: args.notes,
          day: args.day,
          startingTime: args.startingTime,
          endingTime: args.endingTime,
          user: context.user._id,
          quadrant: args.quadrant,
        });
        // push the id to user task
        const thisUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { tasks: task._id } },
          {
            new: true,
            runValidators: true,
          }
        );
        return task;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    addStep: async (parent, args, context) => {
      if (context.user) {
        //see line 23 of auth.js
        const step = await Step.create({
          name: args.name,
          notes: args.notes,
          task: args.task,
          startingTime: args.startingTime,
          endingTime: args.endingTime,
          user: context.user._id,
          quadrant: args.quadrant,
        });
        // push the id to user task
        const thisTask = await Task.findOneAndUpdate(
          { _id: args.task },
          { $push: { steps: step._id } },
          {
            new: true,
            runValidators: true,
          }
        );
        return step;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    updateTask: async (
      parent,
      { _id, name, notes, startingTime, endingTime, quadrant }
    ) => {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: _id },
        { name, notes, startingTime, endingTime, quadrant },
        // Return the newly updated object instead of the original
        { new: true }
      );
      console.log(updatedTask);
      return updatedTask;
    },
    updateStep: async (
      parent,
      { _id, name, notes, startingTime, endingTime, quadrant }
    ) => {
      const updatedStep = await Step.findOneAndUpdate(
        { _id: _id },
        { name, notes, startingTime, endingTime, quadrant },
        // Return the newly updated object instead of the original
        { new: true }
      );
      console.log(updatedStep);
      return updatedStep;
    },
    removeTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const deleteTask = await Task.deleteOne({ _id: taskId });

        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: taskId } },
          { new: true }
        );
        const deleteStep = await Step.deleteMany({ task: taskId });
        return updateUser;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          args,
          // Return the newly updated object instead of the original
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    changeCompletedTask: async (parent, { _id, completed }, context) => {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: _id },
        { completed },
        // Return the newly updated object instead of the original
        { new: true }
      );
      return updatedTask;
    },
    changeCompletedStep: async (parent, { _id, completed }, context) => {
      const updatedStep = await Step.findOneAndUpdate(
        { _id: _id },
        { completed },
        // Return the newly updated object instead of the original
        { new: true }
      );
      return updatedStep;
    },
    removeAllTasks: async (parent, { selectedDay }, context) => {
      // if (context.user) {
      const tasksArr = await Task.find({
        user: "62fa6eb7cc228f02f68e21a7",
        day: selectedDay,
      });
      let foundIds = tasksArr.map((task) => task._id);

      console.log(foundIds);
      const deleteTask = await Task.deleteMany({
        day: selectedDay,
        user: context.user._id,
      });
      // //finish functionaltiy and delete all steps
      foundIds = ["62fa6ec6cc228f02f68e21c5", "62fd661231bdbb53637a78d3"];
      const updateUser = await User.findOneAndUpdate(
        { _id: "62fa6eb7cc228f02f68e21a7" },
        {
          $pull: {
            tasks: {
              $in: ["62fa6ec6cc228f02f68e21c5", "62fd661231bdbb53637a78d3"],
            },
          },
        },
        { new: true }
      );

      return updateUser;
      //}
      // throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
