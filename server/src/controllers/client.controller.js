const Category = require("../models/category");

const getTree = async (options) => {
  let data = await Category.find(options);
  data = await Promise.all(
    data.map(async (value) => {
      const obj = value.toObject();
      delete obj.__v;
      delete obj.fakeId;
      delete obj.parent;
      delete obj.tree;
      obj.children = await getTree({ parent: value.id });
      return obj;
    })
  );
  return data;
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const getCategories = async (req, res) => {
  try {
    const data = await getTree({ parent: null });
    await res.json(data);
  } catch (error) {
    await res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
};
