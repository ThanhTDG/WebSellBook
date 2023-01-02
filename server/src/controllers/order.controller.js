const Order = require("../models/order");

const Controller = require("../utils/controller");

const OrderController = class extends Controller {
  constructor(getData, toJson, populate) {
    super(Order, getData, toJson, populate);
  }
};

/**
 * Get data from body of request
 */
const getData = ({
  userId,
  fullName,
  phone,
  region,
  district,
  ward,
  address,
  shippingCode,
  purchaseDate,
  shippingMethod,
  paymentMethod,
  items,
  status,
  transportFee,
  discount,
}) => ({
  userId,
  shippingInfo: { fullName, phone, region, district, ward, address },
  shippingCode,
  purchaseDate,
  shippingMethod,
  paymentMethod,
  items,
  status,
  transportFee,
  discount,
});

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
  delete obj.__v;
  obj.id = data.id;
  obj.items = data.items.map((item) => item.toJson());
  obj.total = data.total;
  return obj;
};

module.exports = new OrderController(getData, toJson, "items.book");
