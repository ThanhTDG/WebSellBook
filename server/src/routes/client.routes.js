const express = require("express");

const controller = require("../controllers/client.controller");

const router = express.Router();

router.get("/category", controller.getCategories);
router.get("/book", controller.getBooks);
router.get("/book/:id", controller.getBook);

module.exports = router;
