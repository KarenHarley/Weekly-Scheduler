const { Schema, model } = require("mongoose");

const tasksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  startingTime: {
    type: Number,
    required: true,
  },
  endingTime: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = model("Task", tasksSchema);

module.exports = Task;
