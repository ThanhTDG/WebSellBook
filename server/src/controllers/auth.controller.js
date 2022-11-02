const User = require("../models/user");
const { generateAvatar } = require("../utils/generateAvatar");

/**
 * Register a new account
 * @param {Request} req
 * @param {Response} res
 */
const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const avatar = generateAvatar(body.firstName);
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
 * @param {Request} req
 * @param {Response} res
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

const signOut = async (req, res) => {
  try {
    delete req.signedCookies.token;
    res.redirect("/");
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
