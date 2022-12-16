const mongoose = require("mongoose");

const { saveCookie, clearCookie } = require("../utils/cookie");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
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
    selected: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { _id: false }
);

const book2Json = ({
  _id,
  name,
  images,
  countInStock,
  originalPrice,
  discountRate,
  price,
}) => ({ _id, name, images, countInStock, originalPrice, discountRate, price });

cartItemSchema
  .virtual("book", {
    ref: "Book",
    localField: "bookId",
    foreignField: "_id",
    justOne: true,
  })
  .get(function (value) {
    if (value) {
      return book2Json(value);
    }
  });

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

cartItemSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.bookId;
  obj.book = this.book;
  obj.total = this.total;
  return obj;
};

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.virtual("isSelectedAll").get(function () {
  return this.items.every((value) => value.selected === true);
});

cartSchema.virtual("total").get(function () {
  return this.items
    .filter((value) => value.selected)
    .reduce((sum, value) => sum + value.total, 0);
});

cartSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

/**
 * Clear cookie
 * @param {Response} res Response
 */
cartSchema.methods.clearCookie = async function (res) {
  return await clearCookie(res, "cart", false);
};

/**
 * Merge cart
 * @param {Cart} cart
 */
cartSchema.methods.merge = async function (cart) {
  cart.items.forEach((item) => {
    const cartItem = this.items.find((i) => (i.bookId = item.bookId));
    if (cartItem) {
      cartItem.$set(item);
    } else {
      this.items.addToSet(item);
    }
  });
  await this.save();
};

/**
 * Save to cookie
 * @param {Response} res Response
 */
cartSchema.methods.saveCookie = async function (res) {
  return await saveCookie(res, "cart", this, false);
};

cartSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  obj.items = this.items.map((item) => item.toJson());
  obj.isSelectedAll = this.isSelectedAll;
  obj.total = this.total;
  return obj;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
