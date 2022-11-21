const Book = require("../models/book");

const Controller = require("../utils/controller");
const { isEmpty } = require("../utils/utils");

/**
 * Get data from body of request
 * @param {Object} body - body of request
 */
const getData = ({
  name,
  description,
  authors,
  translators,
  sku,
  isbn13,
  isbn10,
  supplier,
  publisher,
  publishDate,
  images,
  weight,
  height,
  width,
  page,
  bookCover,
  status,
  expectedDate,
  countInStock,
  sold,
  originalPrice,
  discountRate,
  category,
}) => {
  const data = {
    name,
    description,
    authors,
    translators,
    sku,
    isbn13,
    isbn10,
    supplier,
    publisher,
    publishDate,
    images,
    weight,
    height,
    width,
    page,
    bookCover,
    status,
    expectedDate,
    countInStock,
    sold,
    originalPrice,
    discountRate,
    category,
  };
  Object.keys(data).forEach((key) => isEmpty(data[key]) && delete data[key]);
  return data;
};

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
  delete obj.__v;
  obj.id = data._id;
  obj.price = data.price;
  return obj;
};

const controller = new Controller(Book, getData, toJson);

/**
 * Upload images
 * @param {Request} req Request
 * @param {Response} res Response
 */
const uploadImgs = async (req, res) => {
  try {
    const files = req.files;
    const paths = files.map((file) => file.path);
    await res.json(paths);
  } catch (error) {
    await res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  ...controller.methods(),
  uploadImgs,
};
