const dotenv = require("dotenv");

const {
  NODE_ENV: { PROC },
} = require("../constants");

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

/**
 * Save cookie
 * @param {Response} res
 * @param {string} key
 * @param {any} data
 * @param {boolean} signed
 */
const saveCookie = async (res, key, data, signed) => {
  const cookieOpts = {
    signed,
    httpOnly: true,
    secure: NODE_ENV === PROC,
    maxAge: process.env.JWT_EXPIRES,
    sameSite: NODE_ENV === PROC ? "none" : "lax",
  };
  return await res.cookie(key, data, cookieOpts);
};

/**
 * Clear cookie
 * @param {Response} res
 * @param {string} key
 * @param {any} data
 * @param {boolean} signed
 */
const clearCookie = async (res, key, signed) => {
  const cookieOpts = {
    signed,
    httpOnly: true,
    secure: NODE_ENV === PROC,
    maxAge: process.env.JWT_EXPIRES,
    sameSite: NODE_ENV === PROC ? "none" : "lax",
  };
  return await res.clearCookie(key, cookieOpts);
};

module.exports = {
  saveCookie,
  clearCookie,
};
