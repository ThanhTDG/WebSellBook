const express = require("express");

const controller = require("../controllers/comment.controller");

const router = express.Router();

router.get("/:book", controller.getComments);

module.exports = router;
