const User = require("../models/user");

const Controller = require("../utils/controller");

const controller = new Controller(User);

module.exports = controller.methods();
