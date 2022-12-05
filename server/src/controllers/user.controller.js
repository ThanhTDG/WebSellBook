const Admin = require("../models/admin");
const Customer = require("../models/customer");
const User = require("../models/user");

const Controller = require("../utils/controller");
const { generateAvatar } = require("../utils/generateAvatar");

const UserController = class extends Controller {
  constructor(getData, toJson) {
    super(User, getData, toJson);
  }

  /**
   * Get all admins
   * @param {Request} req Request
   * @param {Response} res Response
   */
  getAdmins = async (req, res) => {
    try {
      const { page = 0, limit = 0 } = req.query;
      const options = {
        page,
        limit,
        pagination: page && limit,
      };
      const data = await Admin.paginate({}, options);
      data.docs = data.docs.map((value) => this.toJson(value));

      await res.json(data);
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };

  /**
   * Get all customers
   * @param {Request} req Request
   * @param {Response} res Response
   */
  getCustomers = async (req, res) => {
    try {
      const { page = 0, limit = 0 } = req.query;
      const options = {
        page,
        limit,
        pagination: page && limit,
      };
      const data = await Customer.paginate({}, options);
      data.docs = data.docs.map((value) => this.toJson(value));

      await res.json(data);
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };
};

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
  delete obj.__t;
  delete obj.__v;
  delete obj.username;
  delete obj.password;
  obj.id = data.id;
  return obj;
};

module.exports = new UserController(null, toJson);
