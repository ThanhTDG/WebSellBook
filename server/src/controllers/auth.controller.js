const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signUp = async (req, res) => {};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await teq.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
