const mongoose = require("mongoose");
const validator = require("validator").default;

const User = require("./user");

const ErrorHandler = require("../utils/errorHandler");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
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
});

const customerSchema = new Schema({
  addresses: [addressSchema],
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: "Book",
  },
});

const book2Json = ({
  _id,
  name,
  images,
  countInStock,
  originalPrice,
  discountRate,
  price,
}) => ({ _id, name, images, countInStock, originalPrice, discountRate, price });

customerSchema
  .virtual("favorite", {
    ref: "Book",
    localField: "favorites",
    foreignField: "_id",
  })
  .get(function (value) {
    if (value) {
      return value.map((v) => book2Json(v));
    }
  });

/**
 * Credential account
 * @param {string} username
 * @param {string} password
 */
customerSchema.statics.findByCredentials = async (username, password) => {
  const user = await Customer.findOne({
    $or: [{ email: username }, { phone: username }],
  });
  if (!user) {
    throw new ErrorHandler(401, "Unable to login");
  }

  const isMatch = await user.validatePassword(password);
  if (!isMatch) {
    throw new ErrorHandler(401, "Unable to login");
  }

  return user;
};

const Customer = User.discriminator("Customer", customerSchema);

module.exports = Customer;
