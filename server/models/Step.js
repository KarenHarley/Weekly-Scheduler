const { Schema, model } = require("mongoose");

const stepSchema = new Schema({
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
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
});

const Step = model("Step", stepSchema);

module.exports = Step;
