const mongoose = require("mongoose");

const ErrorHandler = require("./errorHandler");

/**
 * Model controllers for admin pages
 * @param {mongoose.Model} model
 * @returns The methods for control routes
 */
const controller = (model) => {
  /**
   * Get array of documents
   * @param {Request} req Request
   * @param {Response} res Response
   */
  const getAll = async function (req, res) {
    try {
      const query = req.query;
      const page = query.page || 0;
      const limit = query.limit || 0;

      const options = {
        page,
        limit,
        pagination: page && limit,
      };
      const data = await model.paginate({}, options);

      await res.json(data);
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };

  /**
   * Get document by id
   * @param {Request} req Request
   * @param {Response} res Response
   */
  const get = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await model.findById(id).exec();

      if (!data) {
        throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
      }
      await res.json(data);
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
  const create = async (req, res) => {
    try {
      const body = model.getData(req.body);
      const data = new model(body);
      const newData = await data.save();
      await res.status(201).json(newData);
    } catch (error) {
      await res.status(400).json({ message: error.message });
    }
  };

  /**
   * Update data
   * @param {Request} req Request
   * @param {Response} res Response
   */
  const update = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const options = { new: true };
      const data = await model.findByIdAndUpdate(id, body, options).exec();

      if (!data) {
        throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
      }
      await res.json(data);
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
  const remove = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await model.findByIdAndDelete(id).exec();

      if (!data) {
        throw new ErrorHandler(400, `Document with {_id: '${id}'} not found`);
      }
      await res
        .status(204)
        .send(`Document with {_id: '${id}'} has been deleted...`);
    } catch (error) {
      await res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
  };

  return {
    getAll,
    get,
    create,
    update,
    remove,
  };
};

module.exports = controller;
