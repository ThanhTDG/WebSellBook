const mongoose = require("mongoose");

const ErrorHandler = require("./errorHandler");

/**
 * Callback get data from body of request
 * @callback GetData
 * @param {Object} body Body of request
 * @returns {Object}
 */

/**
 * Callback get model to json
 * @callback ToJson
 * @param {mongoose.Model} data
 * @returns {Object}
 */

const Controller = class {
  /**
   * @param {mongoose.Model} model
   * @param {GetData} getData
   * @param {ToJson} toJson
   * @param {string|string[]} populate
   */
  constructor(model, getData, toJson, populate) {
    this.model = model;
    this.getData = getData || ((body) => body);
    this.toJson = toJson || ((data) => data);
    this.populate = populate;
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
        populate: this.populate,
      };
      const data = await this.model.paginate({}, options);
      data.docs = data.docs.map((value) => this.toJson(value));

      await res.json(data);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * Get document by id
   * @param {Request} req Request
   * @param {Response} res Response
   */
  get = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.model.findById(id).populate(this.populate);
      if (!data) {
        throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
      }

      await res.json(this.toJson(data));
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  /**
   * Insert new data
   * @param {Request} req Request
   * @param {Response} res Response
   */
  create = async (req, res) => {
    try {
      const body = this.getData(req.body);
      const data = new this.model(body);
      await data.save();
      await res.status(201).json(this.toJson(data));
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
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
      const data = await this.model.findByIdAndUpdate(id, body, options);
      if (!data) {
        throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
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
      const data = await this.model.findByIdAndDelete(id);
      if (!data) {
        throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
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

module.exports = Controller;
