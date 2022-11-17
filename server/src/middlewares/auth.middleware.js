const passport = require("passport");
const ErrorHandler = require("../utils/errorHandler");

/**
 * Login
 * @param {Request} req Request
 * @param {any} user User
 * @param {Function} next Next function
 */
const login = (req, user, next) =>
  req.login(user, async (err) => {
    if (err) {
      return await res
        .status(err.statusCode || 401)
        .json({ message: err.message });
    }

    user.lastSession = new Date();
    await user.save();
    next();
  });

/**
 * Required login
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const requiredLogin = (req, res, next) =>
  passport.authenticate("local", { session: false }, async (err, user) => {
    try {
      if (err) {
        throw new ErrorHandler(401, err.message);
      }

      if (!user) {
        throw new ErrorHandler(401, "Authentication failed");
      }

      login(req, user, next);
    } catch (error) {
      await res
        .status(error.statusCode || 401)
        .json({ message: error.message });
    }
  })(req, res, next);

/**
 * Authenticate token
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const authenticate = async (req, res, next) =>
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    try {
      if (err) {
        throw new ErrorHandler(401, err.message);
      }

      if (!user) {
        throw new ErrorHandler(401, "Authentication failed");
      }

      login(req, user, next);
    } catch (error) {
      await res
        .status(error.statusCode || 401)
        .json({ message: error.message });
    }
  })(req, res, next);

module.exports = {
  requiredLogin,
  authenticate,
};
