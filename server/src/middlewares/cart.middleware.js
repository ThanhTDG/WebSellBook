const Cart = require("../models/cart");

const ErrorHandler = require("../utils/errorHandler");

/**
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const getCart = async (req, res, next) => {
  try {
    const user = req.user;
    let cart;
    if (user) {
      if (user.isAdmin()) {
        throw new ErrorHandler(403, "Permission denied");
      }

      cart = await Cart.findOne({ userId: user.id });
      if (!cart) {
        cart = new Cart({ userId: user.id });
        await cart.save();
      }
    } else {
      cart = new Cart(req.cookies.cart || null);
      await cart.saveCookie(res);
    }
    req.cart = cart;

    next();
  } catch (error) {
    await res.status(error.statusCode || 401).json({ message: error.message });
  }
};

module.exports = {
  getCart,
};
