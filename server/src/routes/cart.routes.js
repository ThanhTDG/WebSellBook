const express = require("express");

const controller = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", controller.getCart);
router.put("/", controller.selectedAll);

router.post("/:book", controller.addBook);
router.put("/:book", controller.updateBook);
router.delete("/:book", controller.deleteBook);

module.exports = router;
