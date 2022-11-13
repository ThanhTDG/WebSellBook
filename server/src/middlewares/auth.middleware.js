const passport = require("passport");
const ErrorHandler = require("../utils/errorHandler");

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

      req.login(user, async (err) => {
        try {
          if (err) {
            throw new ErrorHandler(401, err.message);
          }
          next();
        } catch (error) {
          return await res
            .status(error.statusCode || 401)
            .json({ message: error.message });
        }
      });
    } catch (error) {
      return await res
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

      next();
    } catch (error) {
      return await res
        .status(error.statusCode || 401)
        .json({ message: error.message });
    }
  })(req, res, next);

module.exports = {
  requiredLogin,
  authenticate,
};
