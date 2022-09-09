const express = require("express");

const book = require("./routes/book.routes");

const router = express.Router();

// TODO: write routes here
router.use(book);

module.exports = router;
