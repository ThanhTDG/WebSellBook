const mongoose = require("mongoose");

const User = require("./user");

const ErrorHandler = require("../utils/errorHandler");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  roles: {
    type: [Schema.Types.ObjectId],
    ref: "Role",
  },
});

/**
 * Credential account
 * @param {string} username
 * @param {string} password
 */
adminSchema.statics.findByCredentials = async (username, password) => {
  const user = await Admin.findOne({
    $or: [{ username }, { email: username }, { phone: username }],
  });
  if (!user) {
    throw new ErrorHandler(401, "Unable to login");
  }

  const isMatch = await user.validatePassword(password);
  if (!isMatch) {
    throw new ErrorHandler(401, "Unable to login");
  }

  return user;
};

/**
 * Can access action and subject
 * @param {string} action
 * @param {string} subject
 */
adminSchema.methods.can = async function (action, subject) {
  try {
    await this.populate("roles");
    const hasPerm = this.roles.some(
      async (role) => await role.can(action, subject)
    );
    this.depopulate("roles");

    return hasPerm;
  } catch (error) {
    return false;
  }
};

/**
 * Can access all actions and subjects
 * @param  {...[string, string]} actionsAndSubjects Actions and subjects
 */
adminSchema.methods.canAll = async function (...actionsAndSubjects) {
  try {
    const hasPerm = actionsAndSubjects.every(
      async ([action, subject]) => await this.can(action, subject)
    );

    return hasPerm;
  } catch (error) {
    return false;
  }
};

/**
 * Can access any action and subject
 * @param  {...[string, string]} actionsAndSubjects Actions and subjects
 */
adminSchema.methods.canAny = async function (...actionsAndSubjects) {
  try {
    const hasPerm = actionsAndSubjects.some(
      async ([action, subject]) => await this.can(action, subject)
    );

    return hasPerm;
  } catch (error) {
    return false;
  }
};

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
