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
    selected: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { _id: false }
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
    // items: {
    //   type: [cartItemSchema],
    //   validate: {
    //     validator: (value) => console.log(value),
    //     message: "hello",
    //   },
    // },
  },
  { timestamps: true }
);

cartSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

cartSchema.virtual("total").get(function () {
  return this.items
    .filter((value) => value.selected)
    .reduce((sum, value) => sum + value.total, 0);
});

module.exports = mongoose.model("Cart", cartSchema);
