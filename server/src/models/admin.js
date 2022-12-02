const mongoose = require("mongoose");

const User = require("./user");

const ErrorHandler = require("../utils/errorHandler");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    $or: [{ email: username }, { phone: username }],
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

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
