const passport = require("passport");

/**
 * Required login
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const requiredLogin = (req, res, next) =>
  passport.authenticate("local", { session: true }, async (err, user) => {
    if (err) {
      return await res
        .status(err.statusCode || 401)
        .json({ message: err.message });
    }

    if (!user) {
      return await res.status(401).json({ message: "Authentication failed" });
    }

    req.login(user, async (error) => {
      if (error) {
        return await res.status(401).json({ message: error.message });
      }
      next();
    });
  })(req, res, next);

/**
 * Authentication
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {Function} next
 */
const auth = async (req, res, next) =>
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err) {
      return await res
        .status(err.statusCode || 401)
        .json({ message: err.message });
    }

    if (!user) {
      return await res.status(401).json({ message: "Authentication failed" });
    }

    next();
  })(req, res, next);

module.exports = {
  requiredLogin,
  auth,
};
