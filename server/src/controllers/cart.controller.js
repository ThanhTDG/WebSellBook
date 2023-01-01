const Order = require("../models/order");

const ErrorHandler = require("../utils/errorHandler");

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const getCart = async (req, res) => {
  try {
    const cart = req.cart;
    await res.json(cart.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const selectedAll = async (req, res) => {
  try {
    const { selected } = req.body;
    const user = req.user;
    const cart = req.cart;

    cart.items.forEach((value) => (value.selected = selected));
    await (user ? cart.save() : cart.saveCookie(res));

    await res.json(cart.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const addBook = async (req, res) => {
  try {
    const bookId = req.params.book;
    const user = req.user;
    const cart = req.cart;

    if (cart.items.every((item) => item.bookId != bookId)) {
      cart.items.push({ bookId });
      await (user ? cart.save() : cart.saveCookie(res));
    }
    await cart.populate(["items.book", "items.total"]);

    await res.json(cart.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.book;
    const { quantity, selected } = req.body;

    const user = req.user;
    const cart = req.cart;

    const item = cart.items.find((item) => item.bookId.equals(bookId));
    if (!item) {
      throw new ErrorHandler(400, "Item not in cart");
    }

    if (quantity) item.quantity = quantity;
    if (selected) item.selected = selected;
    await (user ? cart.save() : cart.saveCookie(res));
    await cart.populate(["items.book", "items.total"]);

    await res.json(cart.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.book;
    const user = req.user;
    const cart = req.cart;

    cart.items.pull({ bookId });
    await (user ? cart.save() : cart.saveCookie(res));
    await cart.populate(["items.book", "items.total"]);

    await res.json(cart.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const checkout = async (req, res) => {
  try {
    const user = req.user;
    const cart = req.cart;

    const {
      fullName,
      phone,
      region,
      district,
      ward,
      address,
      shippingMethod,
      paymentMethod,
      transportFee,
      discount,
    } = req.body;

    const order = {
      shippingInfo: { fullName, phone, region, district, ward, address },
      shippingMethod,
      paymentMethod,
      transportFee,
      discount,
    };
    if (user) {
      order.userId = user.id;
    }

    order.items = cart.items
      .filter((item) => item.selected)
      .map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        originalPrice: item.book.originalPrice,
        discountRate: item.book.discountRate,
      }));

    const data = new Order(order);
    await data.save();
    await data.populate("items.book");

    cart.items = cart.items.filter((item) => !item.selected);
    await cart.save();

    await res.json(data.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  selectedAll,
  addBook,
  updateBook,
  deleteBook,
  checkout,
};
