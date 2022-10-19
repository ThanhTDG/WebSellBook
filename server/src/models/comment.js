const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    content: String,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
