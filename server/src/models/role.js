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

roleSchema
  .virtual("_permissions", {
    ref: "Permission",
    localField: "permissions",
    foreignField: "_id",
  })
  .get(function (values) {
    if (values) {
      return values.map((value) => {
        const { _id, id, description } = value;
        return { _id, id, description };
      });
    }
  });

/**
 * Can access with action and subject
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
