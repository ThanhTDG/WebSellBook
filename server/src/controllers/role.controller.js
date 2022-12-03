const Role = require("../models/role");

const Controller = require("../utils/controller");

const RoleController = class extends Controller {
  constructor(getData, toJson) {
    super(Role, getData, toJson);
  }
};

module.exports = new RoleController();
