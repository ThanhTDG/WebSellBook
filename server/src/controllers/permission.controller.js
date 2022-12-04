const Permission = require("../models/permission");

const Controller = require("../utils/controller");

const PermissionController = class extends Controller {
  constructor(getData, toJson) {
    super(Permission, getData, toJson);
  }
};

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const { description } = data;
  return { description };
};

module.exports = new PermissionController(null, toJson);
