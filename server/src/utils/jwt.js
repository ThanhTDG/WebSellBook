require("dotenv").config();

const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES;

/**
 * Sign token
 * @param {object} payload
 * @return {string} The token
 */
const signToken = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: EXPIRES });

/**
 * Verify token
 * @param {string} token
 */
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  signToken,
  verifyToken,
};
