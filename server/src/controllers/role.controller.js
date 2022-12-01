const { ACTION, SUBJECT } = require("../constants");
const Permission = require("../models/permission");

const Role = require("../models/role");

const Controller = require("../utils/controller");

const RoleController = class extends Controller {
  constructor(getData, toJson) {
    super(Role, getData, toJson);
  }

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  getAll = async (req, res) => {
    try {
      const p = await Permission.find();
      const admin = new Role({
        name: "admin",
        permissions: p.map((v) => v.id),
      });
      await admin.save();

      const member = await Role({ name: "member" });
      await member.save();

      await res.json("ok");
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };
};

module.exports = new RoleController();
