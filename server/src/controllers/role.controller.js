const Role = require("../models/role");

const Controller = require("../utils/controller");

const RoleController = class extends Controller {
  constructor(getData, toJson) {
    super(Role, getData, toJson);
  }
};

/**
 * Get data from body of request
 */
const getData = ({ name, description, permissions }) => {
  const data = { name, description, permissions };
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
  obj.id = data.id;
  return obj;
};

module.exports = new RoleController(getData, toJson);
