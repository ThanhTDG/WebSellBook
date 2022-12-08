/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const getCart = async (req, res) => {
  try {
    const cart = req.cart;
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
const selectedAll = async (req, res) => {
  try {
    const { selected } = req.body;
    const user = req.user;
    const cart = req.cart;
    cart.items.forEach((value) => (value.selected = selected));
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
    const set = {};
    if (quantity) set.quantity = quantity;
    if (selected) set.selected = selected;

    const user = req.user;
    const cart = req.cart;
    cart.items.find({ bookId }).$set(set);
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

module.exports = {
  getCart,
  selectedAll,
  addBook,
  updateBook,
  deleteBook,
};
