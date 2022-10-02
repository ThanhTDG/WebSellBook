const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const Book = require("./book");

const Schema = mongoose.Schema;

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
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "vi-VN")) {
          throw new Error("Phone number is invalid");
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 255,
      required: true,
      select: false,
    },
    sex: {
      type: Boolean,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    addresses: [
      {
        region: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        ward: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    cart: {
      items: [
        {
          bookId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
            min: 1,
            required: true,
          },
          select: {
            type: Boolean,
            default: false,
            required: true,
          },
          total: {
            type: Number,
            get: async function () {},
          },
        },
      ],
      total: {
        type: Number,
        get: function () {},
      },
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id }, process.env.SECRET, {
    expiresIn: "7d",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
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
    const SALT = parseInt(process.env.SALT);
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
