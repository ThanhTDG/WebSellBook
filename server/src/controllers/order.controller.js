const Order = require("../models/order");

const Controller = require("../utils/controller");

const OrderController = class extends Controller {
  constructor(getData, toJson) {
    super(Order, getData, toJson);
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
  return obj;
};

module.exports = new OrderController(getData, toJson);
