const express = require("express");

const controller = require("../controllers/cart.controller");

const { checkCart } = require("../middlewares/cart.middleware");

const router = express.Router();

router.get("/", controller.getCart);

router.put("/selectall", controller.selectedAll);

router.post("/checkout", checkCart, controller.checkout);

router.post("/:book", controller.addBook);
router.put("/:book", controller.updateBook);
router.delete("/:book", controller.deleteBook);

module.exports = router;
