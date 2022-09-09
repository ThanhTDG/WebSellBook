const Book = require("../models/book");

const getAll = async (req, res) => {
  try {
    const datas = await Book.find();
    res.json(datas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findById(id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const body = req.body;
  const data = new Book({
    title: body.title,
    description: body.description,
  });

  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const options = { new: true };

    const data = await Book.findByIdAndUpdate(id, body, options);
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findByIdAndDelete(id);
    res.status(204).send(`Document with "${data.title}" has been deleted...`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
