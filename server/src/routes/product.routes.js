const express = require("express");

const controller = require("../controllers/product.controller");

const router = express.Router();

router.get("/category", controller.getCategories);

router.get("/book", controller.getBooks);
router.get("/book/:id", controller.getBook);

router.get("/comment/:book", controller.getComments);

module.exports = router;
