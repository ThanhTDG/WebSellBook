const Order = require("../models/order");

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getBills = async (req, res) => {
  try {
    const user = req.user;
    // TODO:

    await res.json();
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getBill = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    // TODO:

    await res.json();
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getBills,
  getBill,
};
