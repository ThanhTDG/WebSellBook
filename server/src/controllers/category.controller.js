const Category = require("../models/category");

const Controller = require("../utils/controller");

const CategoryController = class extends Controller {
  constructor(getData, toJson, populate) {
    super(Category, getData, toJson, populate);
  }
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
  return obj;
};

module.exports = new CategoryController(getData, toJson, "_parent");
