const {
  SUBJECT: { USER, ADMIN, CUSTOMER },
} = require("../constants");

const { canAny } = require("../middlewares/access.middleware");

const User = require("../models/user");

/**
 * Can access user with action
 * @param {string} action
 */
const accessUser =
  (action) =>
  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {Function} next Next function
   */
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
        throw new ErrorHandler(400, `Userwith {_id: '${id}'} not found`);
      }

      if (user.isAdmin()) {
        canAny([action, USER], [action, ADMIN])(req, res, next);
      } else {
        canAny([action, USER], [action, CUSTOMER])(req, res, next);
      }
    } catch (error) {
      await res
        .status(error.statusCode || 401)
        .json({ message: error.message });
    }
  };

module.exports = {
  accessUser,
};
