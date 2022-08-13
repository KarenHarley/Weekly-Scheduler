const { Schema, model } = require("mongoose");

const tasksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  day: {
    type: String,
    required: true,
  },
  startingTime: {
    type: Number,
    required: true,
  },
  endingTime: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quadrant: {
    type: String,
  },
  steps: [
    {
      type: Schema.Types.ObjectId,
      ref: "Step",
    },
  ],
});

const Task = model("Task", tasksSchema);

module.exports = Task;
