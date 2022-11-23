const Cart = require("../models/cart");

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const getCart = async (req, res) => {
  try {
    const user = req.user;
    let data = await Cart.findOne({ userId: user.id }).populate([
      "items.book",
      "items.total",
    ]);
    if (!data) {
      data = new Cart({ userId: user.id });
      data = await data.save();
    }

    await res.json(data);
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
    const user = req.user;
    const { selected } = req.body;
    const data = await Cart.findOne({ userId: user.id }).populate([
      "items.book",
      "items.total",
    ]);
    data.items.forEach((value) => (value.selected = selected));
    await data.save();

    await res.json(data);
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
    const data = await Cart.findOneAndUpdate(
      { userId: user.id },
      { $addToSet: { items: { bookId } } },
      { new: true, upsert: true }
    ).populate(["items.book", "items.total"]);

    await res.json(data);
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
    console.log(quantity, selected);
    const user = req.user;
    const data = await Cart.findOneAndUpdate(
      { userId: user.id, "items.bookId": bookId },
      {
        $set: {
          "items.$.quantity": quantity || 1,
          "items.$.selected": selected || false,
        },
      },
      { new: true }
    ).populate(["items.book", "items.total"]);

    await res.json(data);
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
    const data = await Cart.findOneAndUpdate(
      { userId: user.id },
      { $pull: { items: { bookId } } },
      { new: true }
    ).populate(["items.book", "items.total"]);

    await res.json(data);
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
};
