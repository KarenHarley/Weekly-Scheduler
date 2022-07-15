const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Invaild email adress"],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Min length of password is 5 characters"],
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    //if a password is created or modified
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("findOneAndUpdate", async function () {

  const userToUpdate = await this.model.findOne(this.getFilter()); //returns the current query filter (returns the current user obj)
  if (userToUpdate.password !== this._update.password) {//compare,.
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
});
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });
const User = model("User", userSchema);

module.exports = User;
