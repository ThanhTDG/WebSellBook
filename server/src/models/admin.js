const async = require("async");
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

adminSchema
  .virtual("_roles", { ref: "Role", localField: "roles", foreignField: "_id" })
  .get(function (values) {
    if (values) {
      return values.map((value) => {
        const { _id, id, name } = value;
        return { _id, id, name };
      });
    }
  });

adminSchema
  .virtual("permissions", {
    ref: "Role",
    localField: "roles",
    foreignField: "_id",
  })
  .get(function (values) {
    if (values) {
      const set = new Set();
      values.forEach((value) => {
        value.permissions.forEach((item) => {
          set.add(item);
        });
      });
      return Array.from(set, (value) => value.toJson());
    }
  });

/**
 * Credential account
 * @param {string} username
 * @param {string} password
 */
adminSchema.statics.findByCredentials = async (username, password) => {
  const user = await Admin.findOne({
    $or: [{ username }, { email: username }, { phone: username }],
  }).populate({ path: "permissions", populate: { path: "permissions" } });
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
    const hasPerm = await async.some(
      this.roles,
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
    const hasPerm = await async.every(
      actionsAndSubjects,
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
    const hasPerm = await async.some(
      actionsAndSubjects,
      async ([action, subject]) => await this.can(action, subject)
    );

    return hasPerm;
  } catch (error) {
    return false;
  }
};

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
