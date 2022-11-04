const Category = require("../models/category");

/**
 * @param {Category} obj Category
 */
const category2Json = (value) => {
  const obj = value.toObject();
  delete obj.__v;
  delete obj.parent;
  delete obj.tree;
  delete obj.createdAt;
  delete obj.updateAt;
  return obj;
};

/**
 * @param {Object} options
 * @returns
 */
const getTree = async (options) => {
  let data = await Category.find(options);
  data = await Promise.all(
    data.map(async (value) => {
      const obj = category2Json(value);
      obj.children = await getTree({ parent: value.id });
      return obj;
    })
  );
  return data;
};

/**
 * @param {Request} req - Request
 * @param {Response} res - Response
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
