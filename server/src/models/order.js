const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

mongoose.plugin(paginate);

const { ORDER_STATUS } = require("../constants");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  discountRate: Number,
});

orderItemSchema.virtual("price").get(function () {
  const price = this.originalPrice * (1 - this.discountRate / 100);
  return Math.round(price / 1e3) * 1e3;
});

orderItemSchema.virtual("total").get(function () {
  return this.quantity * this.price;
});

const shippingInfoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "vi-VN")) {
          throw new Error("Phone number is invalid");
        }
      },
    },
    region: {
      type: String,
      require: true,
      trim: true,
    },
    district: {
      type: String,
      require: true,
      trim: true,
    },
    ward: {
      type: String,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shippingInfo: {
      type: shippingInfoSchema,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    shippingMethod: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.NOT_PROCESSED,
    },
    transportFee: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

orderSchema.virtual("total").get(function () {
  return (
    this.items.reduce((sum, ele) => sum + ele.total, 0) +
    this.transportFee -
    this.discount
  );
});

module.exports = mongoose.model("Order", orderSchema);
