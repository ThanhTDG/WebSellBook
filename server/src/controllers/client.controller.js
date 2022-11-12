const Book = require("../models/book");
const Category = require("../models/category");
const Comment = require("../models/comment");
const ErrorHandler = require("../utils/errorHandler");

/**
 * @param {Category} value Category
 */
const category2Json = (value) => {
  const obj = value.toObject();
  delete obj.__v;
  delete obj.parent;
  delete obj.tree;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

/**
 * @param {Category[]} value Array of categories
 */
const categories2Json = (array) => {
  array = array.map((value) => {
    const children = value.children;
    value = category2Json(value);
    value.children = categories2Json(children);
    return value;
  });
  return array;
};

/**
 * @param {Book} value
 */
const book2Json = (value) => {
  let obj = value.toObject();
  delete obj.__v;
  delete obj.category;
  delete obj.tree;
  delete obj.createdAt;
  delete obj.updatedAt;
  const { shortDes, dimension, numOfReviews, rating, ratingRate } = value;
  obj = { ...obj, shortDes, dimension, numOfReviews, rating, ratingRate };
  return obj;
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
 */
const getCategories = async (req, res) => {
  try {
    const data = await Category.find({ parent: null }).sort("_id");
    await res.json(categories2Json(data));
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getBooks = async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const query = category ? { tree: category } : {};
    const options = {
      page,
      limit,
      populate: ["numOfReviews", "rating", "ratingRate"],
    };
    const data = await Book.paginate(query, options);
    data.docs = data.docs.map((value) => book2Json(value));

    await res.json(data);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findById(id).populate([
      "numOfReviews",
      "rating",
      "ratingRate",
    ]);
    if (!data) {
      throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
    }

    await res.json(book2Json(data));
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getComments = async (req, res) => {
  try {
    const book = req.params.book;
    const { page = 1, limit = 12 } = req.query;
    const data = await Comment.paginate({ book }, { page, limit });
    await res.json(data);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getBooks,
  getBook,
  getComments,
};
