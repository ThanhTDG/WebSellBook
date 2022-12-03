const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

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
    description: String,
    permissions: {
      type: [Schema.Types.ObjectId],
      ref: "Permission",
    },
  },
  { timestamps: true }
);

/**
 * Can access
 * @param {string} action
 * @param {string} subject
 */
roleSchema.methods.can = async function (action, subject) {
  try {
    await this.populate("permissions");
    const hasPerm = this.permissions.some((permission) =>
      permission.can(action, subject)
    );
    this.depopulate("permissions");

    return hasPerm;
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model("Role", roleSchema);
