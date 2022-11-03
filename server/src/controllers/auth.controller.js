const User = require("../models/user");
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
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = user.generateAuthToken();
    // req.signedCookies.token = token;
    await res.json({ token });
  } catch (error) {
    await res.status(400).json({ message: error.message });
  }
};

/**
 * Logout account
 * @param {Request} req Request
 * @param {Response} res Response
 */
const signOut = async (req, res) => {
  try {
    delete req.signedCookies.token;
    await res.json({ message: "Log out successful" });
  } catch (error) {
    await res.status(500).json({ message: error.message });
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
    const obj = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    await res.json(obj);
  } catch (error) {
    await res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Set profile
 * @param {Request} req Request
 * @param {Response} res Response
 */
const setProfile = async (req, res) => {
  try {
    const user = req.user;
  } catch (error) {
    await res.status(error.statusCode || 500).json({ message: error.message });
  }
};

/**
 * Upload avatar
 * @param {Request} req Request
 * @param {Response} res Response
 */
const uploadAvatar = async (req, res) => {
  try {
    const user = req.user;
  } catch (error) {
    await res.status(error.statusCode || 500).json({ message: error.message });
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
      throw new ErrorHandler(500, "Incorrect password");
    }

    user.password = newPassword;
    await user.save();
    await res.json({ message: "Change password successfully" });
  } catch (error) {
    await res.status(error.statusCode || 500).json({ message: error.message });
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
