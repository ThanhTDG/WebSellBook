const ErrorHandler = require("../utils/errorHandler");

/**
 * Check is admin
 * @param {boolean} check If check is true, check user is admin, otherwise check user is customer
 */
const isAdmin =
  (check) =>
  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {Function} next Next function
   */
  async (req, res, next) => {
    try {
      const user = req.user;
      if (check !== user.isAdmin()) {
        throw new ErrorHandler(403, "Permission denied");
      }

      next();
    } catch (error) {
      await res
        .status(error.statusCode || 403)
        .json({ message: error.message });
    }
  };

/**
 * Can access
 * @param {string} method Method name
 * @param  {...any} args Arguments
 */
const _can =
  (method, ...args) =>
  /**
   * @param {Request} req Request
   * @param {Response} res Response
   * @param {Function} next Next function
   */
  async (req, res, next) => {
    try {
      const user = req.user;
      const hasPerm = await user[method](...args);
      if (!hasPerm) {
        throw new ErrorHandler(403, "Permission denied");
      }

      next();
    } catch (error) {
      await res
        .status(error.statusCode || 403)
        .json({ message: error.message });
    }
  };

/**
 * Can access action and subject
 * @param {string} action
 * @param {string} subject
 */
const can = (action, subject) => _can("can", action, subject);

/**
 * Can access all actions and subjects
 * @param  {...[string, string]} actionsAndSubjects Actions and subjects
 */
const canAll = (...actionsAndSubjects) => _can("canAll", ...actionsAndSubjects);

/**
 * Can access any action and subject
 * @param  {...[string, string]} actionsAndSubjects Actions and subjects
 */
const canAny = (...actionsAndSubjects) => _can("canAny", ...actionsAndSubjects);

/**
 * Access subject with action
 * @param {string} subject
 */
const access =
  (subject) =>
  /**
   * @param {string} action
   */
  (action) =>
    can(action, subject);

/**
 * Access subject with all actions
 * @param {string} subject
 */
const accessAll =
  (subject) =>
  /**
   * @param {...string} actions
   */
  (...actions) =>
    canAll(...actions.map((action) => [action, subject]));

/**
 * Access subject with any action
 * @param {string} subject
 */
const accessAny =
  (subject) =>
  /**
   * @param {...string} actions
   */
  (...actions) =>
    canAny(...actions.map((action) => [action, subject]));

module.exports = {
  isAdmin,
  can,
  canAll,
  canAny,
  access,
  accessAll,
  accessAny,
};
