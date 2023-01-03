const Order = require("../models/order");

const Controller = require("../utils/controller");

const OrderController = class extends Controller {
  constructor(getData, toJson, populate) {
    super(Order, getData, toJson, populate);
  }

  getAll = async (req, res) => {
    try {
      const { page = 0, limit = 0, status } = req.query;
      const query = status ? { status } : {};
      const options = {
        page,
        limit,
        pagination: page && limit,
        populate: this.populate,
      };
      const data = await this.model.paginate(query, options);
      data.docs = data.docs.map((value) => this.toJson(value));

      await res.json(data);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };
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
