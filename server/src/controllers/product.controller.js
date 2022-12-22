const { BOOK_SORT } = require("../constants");

const Book = require("../models/book");
const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");

/**
 * @param {Category} data Category
 */
const category2Json = (data) => {
  const obj = data.toObject();
  delete obj.__v;
  delete obj.parent;
  delete obj.tree;
  delete obj.createdAt;
  delete obj.updatedAt;
  obj.children = data.children;
  obj.level = data.level;
  return obj;
};

/**
 * @param {Category[]} array Array of categories
 */
const categories2Json = (array) => {
  array = array.map((value) => {
    value = category2Json(value);
    value.children = categories2Json(value.children);
    if (value.children.length === 0) {
      delete value.children;
    }
    return value;
  });
  return array;
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
 * @param {Book} data Book
 */
const book2Json = (data) => {
  let obj = data.toObject();
  delete obj.__v;
  delete obj.category;
  delete obj.tree;
  delete obj.height;
  delete obj.width;
  delete obj.textSearch;
  // delete obj.createdAt;
  delete obj.updatedAt;
  const { shortDes, dimension, numOfReviews, rating, ratingRate } = data;
  obj = {
    ...obj,
    shortDes,
    dimension,
    numOfReviews,
    rating,
    ratingRate,
  };
  return obj;
};

/**
 * @param {string} sort
 */
const sortMethod = (sort) => {
  switch (sort) {
    case BOOK_SORT.BEST_SELLER:
      return "-sold";
    case BOOK_SORT.NEWEST:
      return "-createdAt";
    case BOOK_SORT.LOW2HIGH:
      return "price";
    case BOOK_SORT.HIGH2LOW:
      return "-price";
    default:
      return "";
  }
};

/**
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getBooks = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12, sort } = req.query;
    let query = search ? { $text: { $search: search } } : {};
    query = category ? { tree: category, ...query } : query;
    const options = {
      page,
      limit,
      populate: ["numOfReviews", "rating", "ratingRate"],
      sort: sortMethod(sort),
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

module.exports = {
  getCategories,
  getBooks,
  getBook,
};
