const Comment = require("../models/comment");

/**
 * @param {Comment} value Comment
 */
const comment2Json = (value) => {
  let obj = value.toObject();
  delete obj.__v;
  delete obj.book;
  delete obj.updatedAt;
  const { _user } = value;
  obj.user = _user;
  return obj;
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getComments = async (req, res) => {
  try {
    const book = req.params.book;
    const { page = 1, limit = 12 } = req.query;
    const opts = { page, limit, populate: "_user" };
    const data = await Comment.paginate({ book }, opts);
    data.docs = data.docs.map((value) => comment2Json(value));

    await res.json(data);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getComments,
};
