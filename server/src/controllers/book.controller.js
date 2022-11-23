const Book = require("../models/book");

const Controller = require("../utils/controller");
const { isEmpty } = require("../utils/utils");

const BookController = class extends Controller {
  constructor(getData, toJson) {
    super(Book, getData, toJson);
  }

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

  methods = () => ({
    getAll: this.getAll,
    get: this.get,
    create: this.create,
    update: this.update,
    remove: this.remove,
    uploadImgs: this.uploadImgs,
  });
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
  obj.id = data._id;
  return obj;
};

const controller = new BookController(getData, toJson);

module.exports = controller.methods();
