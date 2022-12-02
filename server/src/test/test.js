const mongoose = require("mongoose");

const express = require("express");

const router = express.Router();

const Customer = require("../models/customer");

let users = require("../../users.json");

router.get("/", async (req, res) => {
  try {
    res.json("ok");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
