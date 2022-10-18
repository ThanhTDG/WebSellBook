const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const validator = require("validator");

mongoose.plugin(paginate);

const { ROLE } = require("../utils/constants");
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    phone: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "vi-VN")) {
          throw new Error("Phone number is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
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
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.generateAuthToken = function () {
  const token = signToken({ id: this.id });
  return token;
};

// userSchema.methods.toJSON = function () {
//   var obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

userSchema.methods.validatePassword = async function (password) {
  return await validatePassword(password, this.password);
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({
    $or: [{ email: username }, { phone: username }],
  });
  if (!user) {
    throw new Error("Unable to log in");
  }

  const isMatch = await user.validatePassword(password);
  if (!isMatch) {
    throw new Error("Unable to log in");
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

userSchema.pre("findOneAndUpdate", async function (next) {
  // if (!this.isModified("password")) {
  //   return next();
  // }

  const { password } = this.getUpdate()?.$set;
  console.log(password);
  // await hashPassword(this, next);
});

// /^(save|findOneAndUpdate)/

const User = mongoose.model("User", userSchema);

module.exports = User;
