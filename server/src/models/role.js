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
    permissions: {
      type: [Schema.Types.ObjectId],
      ref: "Permission",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
