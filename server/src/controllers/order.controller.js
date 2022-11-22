const Order = require("../models/order");

const Controller = require("../utils/controller");

/**
 * Get data from body of request
 * @param {Object} body Body of request
 */
const getData = ({ }) => {
//   const data = { name, parent };
//   Object.keys(data).forEach((key) => !data[key] && delete data[key]);
//   return data;
};

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
//   delete obj.__v;
//   delete obj.tree;
//   delete obj.children;
//   obj.id = data.id;
  return obj;
};

const controller = new Controller(Order, getData, toJson);

module.exports = controller.methods();
