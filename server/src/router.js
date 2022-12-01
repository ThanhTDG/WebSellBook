const express = require("express");

// TODO: import routes here
const auth = require("./routes/auth.routes");

const category = require("./routes/category.routes");
const book = require("./routes/book.routes");
const order = require("./routes/order.routes");
const role = require('./routes/role.routes');
const user = require("./routes/user.routes");

const product = require("./routes/product.routes");
const comment = require("./routes/comment.routes");
const cart = require("./routes/cart.routes");
const favorite = require("./routes/favorite.routes");

const router = express.Router();

// TODO: use routes here
router.use("/auth", auth);

router.use("/categories", category);
router.use("/books", book);
router.use("/orders", order);
router.use("/roles", role);
router.use("/users", user);

router.use("/", product);
router.use("/comment", comment);
router.use("/cart", cart);
router.use("/favorite", favorite);

module.exports = router;
