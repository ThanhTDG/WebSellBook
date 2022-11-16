require("dotenv").config();

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const { generateAvatar } = require("../utils/generateAvatar");

const user2json = ({
  _id,
  firstName,
  lastName,
  fullName,
  email,
  phone,
  sex,
  birthday,
  avatar,
  lastSession,
}) => ({
  _id,
  firstName,
  lastName,
  fullName,
  email,
  phone,
  sex,
  birthday,
  avatar,
  lastSession,
});

/**
 * Register a new account
 * @param {Request} req Request
 * @param {Response} res Response
 */
const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const avatar = generateAvatar(firstName);
    const body = { firstName, lastName, email, phone, password, avatar };
    const data = new User(body);
    const newData = await data.save();

    const user = user2json(newData);
    await res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    await res.status(400).json({ message: error.message });
  }
};

/**
 * Login account
 * @param {Request} req Request
 * @param {Response} res Response
 */
const signIn = async (req, res) => {
  try {
    const user = req.user;
    const token = user.generateAuthToken();
    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: process.env.JWT_EXPIRES,
      })
      .json({ token });
  } catch (error) {
    await res.status(error.statusCode || 401).json({ message: error.message });
  }
};

/**
 * Logout account
 * @param {Request} req Request
 * @param {Response} res Response
 */
const signOut = async (req, res) => {
  try {
    req.logout(async (err) => {
      if (err) {
        return await res
          .status(err.statusCode || 401)
          .json({ message: err.message });
      }
      await res.clearCookie("token").json({ message: "Log out successful" });
    });
  } catch (error) {
    await res.status(401).json({ message: error.message });
  }
};

/**
 * Get profile
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    await res.json(user2json(user));
  } catch (error) {
    await res.status(error.statusCode || 401).json({ message: error.message });
  }
};

/**
 * Set profile
 * @param {Request} req Request
 * @param {Response} res Response
 */
const setProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, sex, birthday } = req.body;
    const user = req.user;
    const data = await User.findByIdAndUpdate(
      user._id,
      { firstName, lastName, email, phone, sex, birthday },
      { new: true }
    );

    await res
      .status(200)
      .json({ message: "User modified successfully", user: user2json(data) });
  } catch (error) {
    await res.status(error.statusCode || 401).json({ message: error.message });
  }
};

/**
 * Upload avatar
 * @param {Request} req Request
 * @param {Response} res Response
 */
const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const user = req.user;
    user.avatar = file.path;
    await user.save();
    await res.json({ avatar: user.avatar });
  } catch (error) {
    await res.status(error.statusCode || 401).json({ message: error.message });
  }
};

/**
 * Change password
 * @param {Request} req Request
 * @param {Response} res Response
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    const isMatch = await user.validatePassword(currentPassword);
    if (!isMatch) {
      throw new ErrorHandler(401, "Incorrect password");
    }

    user.password = newPassword;
    await user.save();
    await res.json({ message: "Change password successfully" });
  } catch (error) {
    await res.status(error.statusCode || 401).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getProfile,
  setProfile,
  uploadAvatar,
  changePassword,
};
