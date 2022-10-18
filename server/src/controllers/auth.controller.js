const User = require("../models/user");
const generateAvatar = require("../utils/generateAvatar");

const signUp = async (req, res) => {
  try {
    const body = req.body;
    const avatar = generateAvatar(body.firstName);
    const data = new User({ ...body, avatar });
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = user.generateAuthToken();
    // req.signedCookies.token = token;
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
