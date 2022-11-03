const User = require("../models/user");

const { verifyToken } = require("../utils/jwt");

/**
 * Authentication
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {*} next
 */
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = auth;
