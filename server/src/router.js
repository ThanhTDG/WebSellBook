const express = require("express");

const { isAdmin } = require("./middlewares/access.middleware");
const { authenticate, hasUser } = require("./middlewares/auth.middleware");
const { getCart } = require("./middlewares/cart.middleware");

// TODO: import routes here
const auth = require("./routes/auth.routes");

const category = require("./routes/category.routes");
const book = require("./routes/book.routes");
const order = require("./routes/order.routes");
const permission = require("./routes/permission.routes");
const role = require("./routes/role.routes");
const user = require("./routes/user.routes");

const product = require("./routes/product.routes");
const comment = require("./routes/comment.routes");
const cart = require("./routes/cart.routes");
const address = require("./routes/address.routes");
const favorite = require("./routes/favorite.routes");
const bill = require("./routes/bill.routes");

const router = express.Router();

// TODO: use routes here
router.use("/auth", auth);

router.use("/categories", authenticate, isAdmin(true), category);
router.use("/books", authenticate, isAdmin(true), book);
router.use("/orders", authenticate, isAdmin(true), order);
router.use("/permissions", authenticate, isAdmin(true), permission);
router.use("/roles", authenticate, isAdmin(true), role);
router.use("/users", authenticate, isAdmin(true), user);

router.use("/", product);
router.use("/comment", comment);
router.use("/cart", hasUser, getCart, cart);
router.use("/address", authenticate, isAdmin(false), address);
router.use("/favorite", authenticate, isAdmin(false), favorite);
router.use("/order", authenticate, isAdmin(false), bill);

module.exports = router;
