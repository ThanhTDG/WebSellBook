const Role = require("../models/role");

const Controller = require("../utils/controller");
const ErrorHandler = require("../utils/errorHandler");

const RoleController = class extends Controller {
  constructor(getData, toJson, populate) {
    super(Role, getData, toJson, populate);
  }

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
        { _id: id, name: { $ne: "admin" } },
        body,
        options
      );
      if (!data) {
        throw new ErrorHandler(
          400,
          `Document with {_id: '${id}'} not found or cannot update admin role`
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
        name: { $ne: "admin" },
      });
      if (!data) {
        throw new ErrorHandler(
          400,
          `Document with {_id: '${id}'} not found or cannot delete admin role`
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
const getData = ({ name, description, permissions }) => ({
  name,
  description,
  permissions,
});

/**
 * Convert data to custom json
 * @param {Object} data
 */
const toJson = (data) => {
  const obj = data.toObject();
  delete obj.__v;
  obj.id = data.id;
  obj.permissions = data._permissions;
  return obj;
};

module.exports = new RoleController(getData, toJson, "_permissions");
