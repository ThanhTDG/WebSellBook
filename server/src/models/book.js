const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
