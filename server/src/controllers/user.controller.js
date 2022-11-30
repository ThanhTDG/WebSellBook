const User = require("../models/user");

const Controller = require("../utils/controller");

const UserController = class extends Controller {
  constructor(getData, toJson) {
    super(User, getData, toJson);
  }
};

module.exports = new UserController();
