const Controller = require("../utils/controller");
const ErrorHandler = require("../utils/errorHandler");

const AddressController = class extends Controller {
  constructor(getData, toJson) {
    super(null, getData, toJson);
  }

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  getAll = async (req, res) => {
    try {
      const user = req.user;
      await res.json(user.addresses);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  get = async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.user;
      const address = user.addresses.id(id);

      await res.json(address);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  create = async (req, res) => {
    try {
      const user = req.user;
      const body = this.getData(req.body);
      if (!body.fullName) body.fullName = user.fullName;
      if (!body.phone) body.phone = user.phone;

      user.addresses.push(body);
      await user.save();

      await res.status(201).json(user.addresses);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  update = async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.user;
      const body = this.getData(req.body);
      if (!body.fullName) body.fullName = user.fullName;
      if (!body.phone) body.phone = user.phone;

      const address = user.addresses.id(id).$set(body);
      await user.save();

      await res.json(address);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  remove = async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.user;
      user.addresses.pull(id);
      await user.save();

      await res.json(user.addresses);
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
const getData = ({ fullName, phone, region, district, ward, address }) => {
  const data = { fullName, phone, region, district, ward };
  for (const key in data) {
    if (!data[key]) {
      throw new ErrorHandler(400, `Missing field '${key}'`);
    }
  }
  data.address = address;
  return data;
};

module.exports = new AddressController(getData, null);
