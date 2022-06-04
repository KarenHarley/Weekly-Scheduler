const { Schema, model } = require("mongoose");

const tasksSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  notes: {
    type: Text,
  },
  startingTime: {
    type: Number,
    required: true,
    unique: true,
  },
  endingTime: {
    type: Number,
    required: true,
    unique: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Task = model("Task", tasksSchema);

module.exports = Task;
