const mongoose = require("mongoose");

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

cartItemSchema
  .virtual("total", {
    ref: "Book",
    localField: "bookId",
    foreignField: "_id",
    justOne: true,
  })
  .get(function (value) {
    return this.quantity * value.price;
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
