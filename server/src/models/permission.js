const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const { ACTION, SUBJECT } = require("../constants");

mongoose.plugin(paginate);

const Schema = mongoose.Schema;

const permissionSchema = new Schema(
  {
    name: String,
    description: String,
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
    dangerous: String,
    weight: Number,
  },
  { timestamps: true }
);

permissionSchema.index({ subject: 1, action: 1 }, { unique: true });

/**
 * Can access with action and subject
 * @param {string} action
 * @param {string} subject
 */
permissionSchema.methods.can = function (action, subject) {
  return (
    (this.action === action && this.subject === subject) ||
    (this.action === ACTION.ALL && this.subject === subject) ||
    (this.action === action && this.subject === SUBJECT.ALL) ||
    (this.action === ACTION.ALL && this.subject === SUBJECT.ALL)
  );
};

permissionSchema.methods.toJson = function () {
  const { _id, id, name, description, action, subject, dangerous } = this;
  return { _id, id, name, description, action, subject, dangerous };
};

module.exports = mongoose.model("Permission", permissionSchema);
