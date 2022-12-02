const ErrorHandler = require("../utils/errorHandler");

/**
 * Can access
 * @param {string} action
 * @param {string} subject
 */
const can =
  (action, subject) =>
  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {Function} next Next function
   */
  async (req, res, next) => {
    try {
      const user = req.user;
      const hasPerm = await user.can(action, subject);
      if (!hasPerm) {
        throw new ErrorHandler(401, "Permission denied");
      }

      next();
    } catch (error) {
      await res
        .status(error.statusCode || 401)
        .json({ message: error.message });
    }
  };

/**
 * Access subject
 * @param {string} subject
 */
const access =
  (subject) =>
  /**
   * @param {string} action
   */
  (action) =>
    can(action, subject);

module.exports = {
  access,
};
