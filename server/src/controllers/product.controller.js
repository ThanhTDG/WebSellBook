const { BOOK_SORT } = require("../constants");
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
  obj.children = value.children;
  return obj;
};

/**
 * @param {Category[]} value Array of categories
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
 * @param {Book} value Book
 */
const book2Json = (value) => {
  let obj = value.toObject();
  delete obj.__v;
  delete obj.category;
  delete obj.tree;
  // delete obj.createdAt;
  delete obj.updatedAt;
  const { shortDes, dimension, price, numOfReviews, rating, ratingRate } =
    value;
  console.log(value.price);
  obj = {
    ...obj,
    shortDes,
    dimension,
    price,
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
    const { category, page = 1, limit = 12, sort } = req.query;
    const query = category ? { tree: category } : {};
    const options = {
      page,
      limit,
      populate: ["numOfReviews", "rating", "ratingRate"],
      // sort: sortMethod(sort),
    };

    // const aggregate = Book.aggregate(
    //   [
    //     {
    //       $project: {
    //         price: { $multiply: ["$originalPrice", "$discountRate"] },
    //       },
    //     },
    //     { $sort: { price: 1 } },
    //   ],
    //   { allowDiskUse: true }
    // );
    // const data = await Book.aggregatePaginate(aggregate, options);
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
  getCategories,
  getBooks,
  getBook,
  getComments,
};