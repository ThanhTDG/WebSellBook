const mongoose = require("mongoose");

const Book = require("./book");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
      required: true,
    },
    select: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { _id: false, toJSON: { virtuals: true } }
);

cartItemSchema.virtual("total").get(async function () {
  const book = await Book.findById(this.bookId);
  return this.quantity * book.total;
});

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [cartItemSchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

cartSchema.virtual("total").get(function () {
  return this.items.reduce((sum, ele) => sum + ele.total, 0);
});

module.exports = mongoose.model("Cart", cartSchema);
