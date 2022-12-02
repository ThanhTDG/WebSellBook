const Admin = require("../models/admin");
const User = require("../models/user");

const Controller = require("../utils/controller");
const { generateAvatar } = require("../utils/generateAvatar");

const UserController = class extends Controller {
  constructor(getData, toJson) {
    super(User, getData, toJson);
  }
};

module.exports = new UserController();
