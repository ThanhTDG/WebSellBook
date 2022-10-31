const Book = require("../models/book");
const Controller = require("../utils/controller");

/**
 * Get data from body of request
 * @param {Object} body - body of request
 */
const getData = (body) => {
  const {
    name,
    shortDescription,
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
    dimension,
    page,
    bookCover,
    status,
    expectedDate,
    countInStock,
    originalPrice,
    discountRate,
    category,
  } = body;
  return {
    name,
    shortDescription,
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
    dimension,
    page,
    bookCover,
    status,
    expectedDate,
    countInStock,
    originalPrice,
    discountRate,
    category,
  };
};

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
  delete obj.fakeId;
  delete obj.__v;
  obj.total = data.total;
  return obj;
};

const controller = new Controller(Book, getData, toJson);

module.exports = controller.methods();
