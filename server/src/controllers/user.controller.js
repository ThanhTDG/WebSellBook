const Admin = require("../models/admin");
const Customer = require("../models/customer");
const User = require("../models/user");

const Controller = require("../utils/controller");
const ErrorHandler = require("../utils/errorHandler");
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

  /**
   * Create admin
   * @param {Request} req Request
   * @param {Response} res Response
   */
  createAdmin = async (req, res) => {
    try {
      const body = this.getData(req.body);
      body.avatar = generateAvatar(body.firstName);
      const data = new Admin(body);
      await data.save();

      const user = this.toJson(data);
      await res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };

  /**
   * Update data by id
   * @param {Request} req Request
   * @param {Response} res Response
   */
  update = async (req, res) => {
    try {
      const id = req.params.id;
      const body = this.getData(req.body);
      const options = { new: true };
      const data = await this.model.findOneAndUpdate(
        { _id: id, username: { $ne: "admin" } },
        body,
        options
      );
      if (!data) {
        throw new ErrorHandler(
          400,
          `Document with {_id: '${id}'} not found or cannot update admin user`
        );
      }

      await res.json(this.toJson(data));
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * Delete data by id
   * @param {Request} req Request
   * @param {Response} res Response
   */
  remove = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.model.findOneAndDelete({
        _id: id,
        username: { $ne: "admin" },
      });
      if (!data) {
        throw new ErrorHandler(
          400,
          `Document with {_id: '${id}'} not found or cannot delete admin user`
        );
      }

      await res.json({
        message: `Document with {_id: '${id}'} has been deleted...`,
      });
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };
};

/**
 * Get data from body of request
 */
const getData = ({
  firstName,
  lastName,
  email,
  phone,
  password,
  birthday,
  sex,
  roles,
}) => {
  const data = {
    firstName,
    lastName,
    email,
    phone,
    password,
    birthday,
    sex,
    roles,
  };
  Object.keys(data).forEach((key) => !data[key] && delete data[key]);
  return data;
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

module.exports = new UserController(getData, toJson);
