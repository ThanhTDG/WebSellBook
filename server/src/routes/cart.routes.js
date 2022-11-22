const express = require("express");

const { authenticate } = require("../middlewares/auth.middleware");

const controller = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", authenticate, controller.getCart);

router.post("/:book", authenticate, controller.addBook);
router.put("/:book", authenticate, controller.updateBook);
router.delete("/:book", authenticate, controller.deleteBook);

module.exports = router;
