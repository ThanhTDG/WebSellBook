const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Role = require("./role");

const Schema = mongoose.Schema;

const SALT = 10;

const userSchema = new Schema({
  firstName: {
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 255,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  addresses: [
    {
      address: String,
    },
  ],
  roles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Role",
      required: true,
      default: async () => {
        try {
          const data = await Role.findOne({ name: "user" });
          return data;
        } catch (error) {
          return null;
        }
      },
    },
  ],
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
