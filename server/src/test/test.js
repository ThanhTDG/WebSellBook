const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const options = { discriminatorKey: "kind" };

const testSchema = new Schema({
  name: {
    type: String,
  },
});

testSchema.index({ name: 1, __t: 1 }, { unique: true });

testSchema.pre("save", async function (next) {
  console.log("test save");
});

const Test = mongoose.model("Test", testSchema);

const test1Schema = new Schema({ age: Number });

test1Schema.pre("save", async function (next) {
  console.log("test1 save");
});

const Test1 = Test.discriminator("Test1", test1Schema);

const Test2 = Test.discriminator("Test2", new Schema({ num: Number }));

const express = require("express");

const router = express.Router();

const Customer = require("../models/customer");

let users = require("../../users.json");

router.get("/", async (req, res) => {
  try {
    users.forEach((value) => {
      delete value.favorites;
      value.birthday = new Date("2001-01-01");
      value.lastSession = new Date();
      value.createdAt = new Date();
      value.updatedAt = new Date();
      value._id = value._id.$oid;
    });
    // await Customer.insertMany(users);
    res.json("ok");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
