const Book = require("../models/book");

const Controller = require("../utils/controller");
const { isEmpty } = require("../utils/utils");

const BookController = class extends Controller {
  constructor(getData, toJson, populate) {
    super(Book, getData, toJson, populate);
  }

  getAll = async (req, res) => {
    try {
      const { page = 0, limit = 0, status } = req.query;
      const query = status ? { status } : {};
      const options = {
        page,
        limit,
        pagination: page && limit,
        populate: this.populate,
      };
      const data = await this.model.paginate(query, options);
      data.docs = data.docs.map((value) => this.toJson(value));

      await res.json(data);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * Upload images
   * @param {Request} req Request
   * @param {Response} res Response
   */
  uploadImgs = async (req, res) => {
    try {
      const files = req.files;
      const paths = files.map((file) => file.path);
      await res.json({ paths });
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * Destroy images
   * @param {Request} req Request
   * @param {Response} res Response
   */
  destroyImgs = async (req, res) =>
    await res.json({ message: "Delete image successfully" });
};

/**
 * Get data from body of request
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
  delete obj.tree;
  delete obj.textSearch;
  obj.id = data._id;
  obj.category = data._category;
  return obj;
};

module.exports = new BookController(getData, toJson, "_category");
