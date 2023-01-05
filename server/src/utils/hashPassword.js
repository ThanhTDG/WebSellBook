const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Hash password
 * @param {string} password The password to be encrypted.
 * @return A promise to be either resolved with the encrypted password salt or rejected with an Error
 */
const hashPassword = async (password) => {
  const SALT = parseInt(process.env.SALT);
  const salt = await bcrypt.genSalt(SALT);
  return await bcrypt.hash(password, salt);
};

/**
 * Validate password
 * @param {string} password The password to be encrypted.
 * @param {string} encryptedPassword The password to be compared against.
 * @return A promise to be either resolved with the comparison result salt or rejected with an Error
 */
const validatePassword = async (password, encryptedPassword) =>
  await bcrypt.compare(password, encryptedPassword);

module.exports = {
  hashPassword,
  validatePassword,
};
