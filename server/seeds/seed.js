const db = require("../config/connection");
const { User,Task } = require("../models");

const userData = require("./userData.json");

db.once("open", async () => {
  await User.deleteMany({});
  await Task.deleteMany({})

  const users = await User.insertMany(userData);

  console.log("Users seeded!");
  process.exit(0);
});
