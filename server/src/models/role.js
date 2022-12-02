const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const permission = require("./permission");

mongoose.plugin(paginate);

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    permissions: {
      type: [Schema.Types.ObjectId],
      ref: "Permission",
    },
  },
  { timestamps: true }
);

/**
 * @param {string} action
 * @param {string} subject
 */
roleSchema.methods.can = async function (action, subject) {
  try {
    await this.populate("permissions");
    const hasPerm = this.permissions.some(
      (permission) =>
        permission.action === action && permission.subject === subject
    );
    this.depopulate("permissions");

    return hasPerm;
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model("Role", roleSchema);
