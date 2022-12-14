const Category = require("../models/category");

const Controller = require("../utils/controller");

/**
 * @param {Category} data Category
 */
const category2Json = (data) => {
  const obj = data.toObject();
  delete obj.__v;
  delete obj.parent;
  delete obj.tree;
  obj.id = data.id;
  obj.level = data.level;
  obj.children = data.children;
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

const CategoryController = class extends Controller {
  constructor(getData, toJson, populate) {
    super(Category, getData, toJson, populate);
  }

  /**
   * Get array of documents
   * @param {Request} req Request
   * @param {Response} res Response
   */
  getAll = async (req, res) => {
    try {
      const { tree = false, page = 0, limit = 0 } = req.query;
      let data;
      if (tree === "true" || tree === true) {
        data = await this.model.find(
          { parent: null },
          {},
          { hasChildren: true }
        );
        data = categories2Json(data);
      } else {
        const options = {
          page,
          limit,
          pagination: page && limit,
          populate: this.populate,
        };
        data = await this.model.paginate({}, options);
        data.docs = data.docs.map((value) => this.toJson(value));
      }

      await res.json(data);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };
};

/**
 * Get data from body of request
 */
const getData = ({ name, parent }) => {
  const data = { name, parent };
  Object.keys(data).forEach((key) => !data[key] && delete data[key]);
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
  delete obj.children;
  obj.id = data.id;
  obj.parent = data._parent;
  obj.level = data.level;
  return obj;
};

module.exports = new CategoryController(getData, toJson, "_parent");
