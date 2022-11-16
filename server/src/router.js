const express = require("express");

// TODO: import routes here
const auth = require("./routes/auth.routes");
const book = require("./routes/book.routes");
const category = require("./routes/category.routes");
const order = require("./routes/order.routes");
const user = require("./routes/user.routes");
const product = require("./routes/product.routes");

const router = express.Router();

// TODO: use routes here
router.use("/auth", auth);
router.use("/books", book);
router.use("/categories", category);
router.use("/orders", order);
router.use("/users", user);
router.use("/", product);

module.exports = router;
