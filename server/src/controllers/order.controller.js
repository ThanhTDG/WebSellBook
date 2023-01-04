const Book = require("../models/book");
const Order = require("../models/order");

const Controller = require("../utils/controller");
const { isEmpty } = require("../utils/utils");

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

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  updateItem = async (req, res) => {
    try {
      const { id, bookId } = req.params;
      let { quantity, originalPrice, discountRate } = req.body;
      if (!originalPrice || !discountRate) {
        const book = await Book.findById(bookId);
        originalPrice = originalPrice || book.originalPrice;
        discountRate = discountRate || book.discountRate;
      }

      const data = await this.model.findById(id);
      const item = data.items.find((value) => value.bookId.equals(bookId));
      if (item) {
        item.quantity = quantity;
        item.originalPrice = originalPrice;
        item.discountRate = discountRate;
      } else {
        const newItem = { bookId, quantity, originalPrice, discountRate };
        data.items.push(newItem);
      }
      await data.save();
      await data.populate(this.populate);

      await res.json(this.toJson(data));
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  deleteItem = async (req, res) => {
    try {
      const { id, bookId } = req.params;
      const data = await this.model.findById(id);
      data.items = data.items.filter((item) => !item.bookId.equals(bookId));
      await data.save();
      await data.populate(this.populate);

      await res.json(this.toJson(data));
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
  status,
  transportFee,
  discount,
}) => {
  const data = {
    userId,
    shippingInfo: { fullName, phone, region, district, ward, address },
    shippingCode,
    purchaseDate,
    shippingMethod,
    paymentMethod,
    status,
    transportFee,
    discount,
  };
  Object.keys(data).forEach((key) => isEmpty(data[key]) && delete data[key]);
  return data;
};

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
  delete obj.__v;
  obj.id = data.id;
  obj.user = data.user;
  obj.process = JSON.parse(JSON.stringify(data.process));
  obj.items = data.items.map((item) => item.toJson());
  obj.total = data.total;
  return obj;
};

module.exports = new OrderController(getData, toJson, ["items.book", "user"]);
