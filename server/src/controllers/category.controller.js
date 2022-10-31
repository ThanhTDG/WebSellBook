const Category = require("../models/category");
const Controller = require("../utils/controller");

/**
 * Get data from body of request
 * @param {Object} body - body of request
 */
const getData = (body) => {
  const { name, description, image, parent } = body;
  return {
    name,
    description,
    image,
    parent,
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
  return obj;
};

const controller = new Controller(Category, getData, toJson);

module.exports = controller.methods();
