const express = require("express");

// TODO: import routes here
const auth = require("./routes/auth.routes");
const role = require("./routes/role.routes");
const user = require("./routes/user.routes");
const book = require("./routes/book.routes");

const router = express.Router();

// TODO: write routes here
router.use(auth);
router.use(role);
router.use(user);
router.use(book);

module.exports = router;
