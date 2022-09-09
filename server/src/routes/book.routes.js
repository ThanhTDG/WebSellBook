const express = require("express");

const controller = require("../controllers/book.controller");

const router = express.Router();

router.get("/books", controller.getAll);
router.post("/books", controller.create);

router.get("/books/:id", controller.get);
router.patch("/books/:id", controller.update);
router.delete("/books/:id", controller.remove);

module.exports = router;
