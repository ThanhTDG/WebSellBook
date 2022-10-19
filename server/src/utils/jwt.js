const jwt = require("jsonwebtoken");

/**
 * Sign token
 * @param {object} payload
 * @return {string} The token
 */
const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

/**
 * Verify token
 * @param {string} token
 */
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  signToken,
  verifyToken,
};
