const passport = require("passport");

const User = require("../models/user");
const { uploadToCloudinary } = require("../services/upload.service");
const ErrorHandler = require("../utils/errorHandler");
const { generateAvatar } = require("../utils/generateAvatar");

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

    const user = {
      id: newData.id,
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
      phone: newData.phone,
      avatar: newData.avatar,
    };
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
    await res.json({ token });
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
    // req.logout();
    await res.json({ message: "Log out successful" });
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
    const { id, firstName, lastName, email, phone, sex, birthday, avatar } =
      req.user;
    const user = {
      id,
      firstName,
      lastName,
      email,
      phone,
      sex,
      birthday,
      avatar,
    };
    await res.json(user);
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
    const data = req.user;
    data.overwrite({ firstName, lastName, email, phone, sex, birthday });
    const newData = await data.save();

    const user = {
      id: newData.id,
      firstName: newData.firstName,
      lastName: newData.lastName,
      email: newData.email,
      phone: newData.phone,
      sex: newData.sex,
      birthday: newData.birthday,
      avatar: newData.avatar,
    };
    await res.status(200).json({ message: "User modified successfully", user });
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
