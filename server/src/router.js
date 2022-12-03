const express = require("express");

const { isAdmin } = require("./middlewares/access.middleware");
const { authenticate } = require("./middlewares/auth.middleware");

// TODO: import routes here
const auth = require("./routes/auth.routes");

const category = require("./routes/category.routes");
const book = require("./routes/book.routes");
const order = require("./routes/order.routes");
const role = require("./routes/role.routes");
const user = require("./routes/user.routes");

const product = require("./routes/product.routes");
const comment = require("./routes/comment.routes");
const cart = require("./routes/cart.routes");
const favorite = require("./routes/favorite.routes");

const test = require("./test/test");

const router = express.Router();

// TODO: use routes here
router.use("/auth", auth);

router.use("/categories", authenticate, isAdmin, category);
router.use("/books", authenticate, isAdmin, book);
router.use("/orders", authenticate, isAdmin, order);
router.use("/roles", authenticate, isAdmin, role);
router.use("/users", authenticate, isAdmin, user);

router.use("/", product);
router.use("/comment", comment);
router.use("/cart", authenticate, cart);
router.use("/favorite", authenticate, favorite);

// router.use("/test", test);

module.exports = router;
