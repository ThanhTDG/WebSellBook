const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const validator = require("validator").default;

mongoose.plugin(paginate);

const { ORDER_STATUS } = require("../constants");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    originalPrice: Number,
    discountRate: Number,
  },
  { _id: false }
);

const book2Json = ({ _id, name, images }) => ({ _id, name, images });

orderItemSchema
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

orderItemSchema.virtual("price").get(function () {
  const price = this.originalPrice * (1 - this.discountRate / 100);
  return Math.round(price / 1e3) * 1e3;
});

orderItemSchema.virtual("total").get(function () {
  return this.quantity * this.price;
});

orderItemSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.bookId;
  delete obj.originalPrice;
  delete obj.discountRate;
  obj.book = this.book;
  obj.book.id = this.book._id;
  obj.book.originalPrice = this.originalPrice;
  obj.book.discountRate = this.discountRate;
  obj.book.price = this.price;
  obj.total = this.total;
  return obj;
};

const shippingInfoSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      require: true,
      trim: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "vi-VN"),
        message: "Phone number is invalid",
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
    orderCode: String,
    shippingCode: String,
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    shippingMethod: {
      type: String,
      // required: true,
    },
    paymentMethod: {
      type: String,
      // required: true,
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
    paid: {
      type: Number,
      default: 0,
    },
    process: {
      type: Map,
      of: Date,
      default: function () {
        const obj = {};
        Object.values(ORDER_STATUS).forEach((status) => (obj[status] = null));
        obj[ORDER_STATUS.NOT_PROCESSED] = new Date();
        return obj;
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const user2json = ({
  _id,
  id,
  firstName,
  lastName,
  email,
  phone,
  sex,
  birthday,
}) => ({
  _id,
  id,
  firstName,
  lastName,
  email,
  phone,
  sex,
  birthday,
});

orderSchema
  .virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
  })
  .get(function (value) {
    if (value) {
      return user2json(value);
    }
  });

orderSchema.virtual("total").get(function () {
  return (
    this.items.reduce((sum, ele) => sum + ele.total, 0) +
    this.transportFee -
    this.discount
  );
});

orderSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.userId;
  delete obj.updatedAt;
  obj.process = JSON.parse(JSON.stringify(this.process));
  obj.items = this.items.map((item) => item.toJson());
  obj.total = this.total;
  return obj;
};

orderSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const status = update.status;

  const doc = await this.findOne(this.getQuery()).clone();
  if (!doc.process.get(status) || doc.status !== status) {
    doc.process.set(status, new Date());
  }
  await doc.save();

  next();
});

module.exports = mongoose.model("Order", orderSchema);
