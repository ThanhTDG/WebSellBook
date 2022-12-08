const passport = require("passport");

const ErrorHandler = require("../utils/errorHandler");

const opts = { session: false };

/**
 * Login
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const _login =
  (req, res, next) =>
  /**
   * @param {Error} err Error
   * @param {any} user User
   */
  async (err, user) => {
    try {
      if (err) {
        throw new ErrorHandler(401, err.message);
      }

      if (!user) {
        throw new ErrorHandler(401, "Authentication failed");
      }

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
    } catch (error) {
      await res
        .status(error.statusCode || 401)
        .json({ message: error.message });
    }
  };

/**
 * Required login
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const requiredLogin = (req, res, next) => {
  const strategy =
    req.body.isAdmin === "true" ? "local-admin" : "local-customer";
  return passport.authenticate(strategy, opts, _login(req, res, next))(req, res, next);
};

/**
 * Authenticate token
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const authenticate = (req, res, next) =>
  passport.authenticate("jwt", opts, _login(req, res, next))(req, res, next);

/**
 * Has user
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next Next function
 */
const hasUser = (req, res, next) =>
  passport.authenticate("jwt", opts, (err, user) =>
    req.login(user, () => next())
  )(req, res, next);

module.exports = {
  requiredLogin,
  authenticate,
  hasUser,
};
