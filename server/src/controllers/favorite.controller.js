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
    user.favorites.addToSet(bookId);
    await user.save();

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
    user.favorites.pull(bookId);
    await user.save();
    await user.populate("favorite");

    await res.json(user.favorite);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
