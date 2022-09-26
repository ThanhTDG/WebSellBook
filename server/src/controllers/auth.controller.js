const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signUp = async (req, res) => {};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: username }, { phone: username }],
    });

    if (user !== null || (await user.validatePassword(password))) {
      const token = jwt.sign({ user: user.id }, process.env.SECRET, {
        expiresIn: "7d",
      });
      res.json({ token });
    } else {
      res.status(401).send("Incorrect username or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
