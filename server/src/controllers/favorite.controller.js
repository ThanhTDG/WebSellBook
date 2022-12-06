const Customer = require("../models/customer");

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getFavorites = async (req, res) => {
  try {
    const user = req.user;
    await user.populate("favorite");
    await res.json(user.favorite);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const addFavorite = async (req, res) => {
  try {
    const bookId = req.params.book;
    const user = req.user;
    await Customer.findByIdAndUpdate(
      user.id,
      { $addToSet: { favorites: bookId } },
      { new: true }
    );

    await res.json({ message: "Successfully add favorite book" });
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const removeFavorite = async (req, res) => {
  try {
    const bookId = req.params.book;
    const user = req.user;
    const data = await Customer.findByIdAndUpdate(
      user.id,
      { $pull: { favorites: bookId } },
      { new: true }
    ).populate("favorite");

    await res.json(data.favorite);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
