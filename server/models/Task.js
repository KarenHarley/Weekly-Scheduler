const { Schema, model } = require("mongoose");

const tasksSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  startingTime: {
    type: Int,
    required: true,
    unique: true,
  },
  endingTime: {
    type: Int,
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
