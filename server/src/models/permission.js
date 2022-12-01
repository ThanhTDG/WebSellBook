const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const { ACTION, SUBJECT } = require("../constants");

mongoose.plugin(paginate);

const Schema = mongoose.Schema;

const permissionSchema = new Schema(
  {
    subject: {
      type: String,
      enum: Object.values(SUBJECT),
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(ACTION),
      required: true,
    },
  },
  { timestamps: true }
);

permissionSchema.index({ subject: 1, action: 1 }, { unique: true });

module.exports = mongoose.model("Permission", permissionSchema);
