const express = require("express");

const controller = require("../controllers/bill.controller");

const router = express.Router();

router.get("/", controller.getBills);

router.get("/:id", controller.getBill);

module.exports = router;
