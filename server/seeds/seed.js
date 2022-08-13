const db = require("../config/connection");
const { User,Task,Step } = require("../models");

const userData = require("./userData.json");

db.once("open", async () => {
  await User.deleteMany({});
  await Task.deleteMany({})
  await Step.deleteMany({})

  const users = await User.insertMany(userData);

  console.log("Users seeded!");
  process.exit(0);
});
