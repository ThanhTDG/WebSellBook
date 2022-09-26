const mongoose = require("mongoose");

const Book = require("./book");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    total: {
      type: Number,
      get: async function () {
        let sum = 0;
        for (let item in this.items) {
          sum += item.total;
        }
        return sum;
      },
    },
    items: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
          required: true,
        },
        total: {
          type: Number,
          get: async function () {
            const book = await Book.findById(this.bookId);
            if (!book) {
              throw new Error("Book not found");
            }
            return this.quantity * book.price;
          },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
