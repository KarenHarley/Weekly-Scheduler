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
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
