const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const validator = require("validator").default;

mongoose.plugin(paginate);

const { ROLE } = require("../constants");
const ErrorHandler = require("../utils/errorHandler");
const { generateAvatar } = require("../utils/generateAvatar");
const { hashPassword, validatePassword } = require("../utils/hashPassword");
const { signToken } = require("../utils/jwt");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  phone: {
    type: String,
    require: true,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "vi-VN")) {
        throw new Error("Phone number is invalid");
      }
    },
  },
  region: {
    type: String,
    require: true,
    trim: true,
  },
  district: {
    type: String,
    require: true,
    trim: true,
  },
  ward: {
    type: String,
    require: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minLength: 1,
      maxLength: 255,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 1,
      maxLength: 255,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      require: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email is invalid",
      },
    },
    phone: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "vi-VN"),
        message: "Phone number is invalid",
      },
    },
    password: {
      type: String,
      required: true,
      // select: false,
      // minLength: [
      //   8,
      //   "Password is shorter than the minimum allowed length (8).",
      // ],
      // maxLength: [
      //   255,
      //   "Password is longer than the maximum allowed length (255).",
      // ],
      // validate: {
      //   validator: (value) =>
      //     /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,255}$/.test(value),
      //   message: "Password is invalid",
      // },
    },
    sex: {
      type: Boolean,
      default: true,
    },
    birthday: {
      type: Date,
      default: new Date("01/01/2001"),
    },
    avatar: {
      type: String,
      default: function () {
        return generateAvatar(this.firstName);
      },
    },
    addresses: [addressSchema],
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.MEMBER,
    },
    lastSession: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.virtual("fullName").get(function () {
  return `${this.lastName} ${this.firstName}`;
});

/**
 * Generate token
 * @returns {string}
 */
userSchema.methods.generateAuthToken = function () {
  const token = signToken({ id: this.id });
  return token;
};

/**
 * Validate password
 * @param {string} password
 */
userSchema.methods.validatePassword = async function (password) {
  return await validatePassword(password, this.password);
};

/**
 * To JSON
 */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

/**
 * Credential account
 * @param {string} username
 * @param {string} password
 */
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
