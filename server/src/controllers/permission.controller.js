const Permission = require("../models/permission");

const Controller = require("../utils/controller");

const PermissionController = class extends Controller {
  constructor(getData, toJson) {
    super(Permission, getData, toJson);
  }

  /**
   * Get array of documents
   * @param {Request} req Request
   * @param {Response} res Response
   */
  getAll = async (req, res) => {
    try {
      const { page = 0, limit = 0 } = req.query;
      const options = {
        page,
        limit,
        pagination: page && limit,
        sort: "weight",
      };
      const data = await this.model.paginate({}, options);
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
  const { _id, id, description } = data;
  return { _id, id, description };
};

module.exports = new PermissionController(null, toJson);
