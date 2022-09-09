const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

module.exports = mongoose.model("Book", bookSchema);
