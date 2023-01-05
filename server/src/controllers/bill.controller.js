const Order = require("../models/order");

const ErrorHandler = require("../utils/errorHandler");

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getBills = async (req, res) => {
  try {
    const { page = 1, limit = 12, status } = req.query;
    const user = req.user;

    const query = status ? { status } : {};
    const options = { page, limit, populate: ["items.book", "process"] };
    const data = await Order.paginate({ userId: user.id, ...query }, options);
    data.docs = data.docs.map((value) => value.toJson());

    await res.json(data);
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
    const data = await Order.findOne({ _id: id, userId: user.id }).populate(
      "items.book"
    );
    if (!data) {
      throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
    }

    await res.json(data.toJson());
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getBills,
  getBill,
};
