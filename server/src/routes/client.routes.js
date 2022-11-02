const express = require("express");

const controller = require("../controllers/client.controller");

const router = express.Router();

router.get("/", controller.getCategories);

module.exports = router;
