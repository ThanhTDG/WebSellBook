const dotenv = require("dotenv");
const mongoose = require("mongoose");

const categories = require("./data/data/categories.json");
const products = require("./data/data/products.json");
const users = require("./data/data/user.json");

const Category = require("./models/category");

dotenv.config();

// Database connection
const startMongo = () => {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connect to MongoDB"))
    .catch((err) => console.log(err));
};

/**
 * @param {any[]} arr
 */
const getKeys = (arr) => {
  const keys = [];
  arr.forEach((value) => {
    const ks = Object.keys(value);
    ks.forEach((k) => {
      if (!keys.includes(k)) {
        keys.push(k);
      }
    });
  });
  return keys;
};

/**
 * @param {Object} json
 * @param {string} key
 * @param {any} value
 */
const assign = (json, key, value) => {
  if (!json[key]) json[key] = value;
  return json;
};

/**
 * @param {any[]} arr
 */
const getSample = (arr) => {
  const json = {};
  arr.forEach((obj) => {
    for (const key in obj) {
      if (obj[key] instanceof Array) {
        if (!json[key]) {
          json[key] = [];
        }
        continue;
      }

      if (obj[key] instanceof Object) {
        if (!json[key]) {
          json[key] = {};
        }
        continue;
      }

      if (!json[key]) {
        json[key] = "";
      }
    }
  });
  return json;
};

/**
 * @param {Object} json
 */
const json2arr = (json) => {
  const obj = json;
};

// const t = ["id", "name", "full_name", "email", "birthD"];

/**
 * @param {Array} categories
 */
const importCategories = (categories, parent = null) => {
  categories.forEach(async (value) => {
    const { id, name, child = [] } = value;
    const data = parent
      ? new Category({
          name,
          fakeId: id,
          parent,
        })
      : new Category({
          name,
          fakeId: id,
        });
    const newData = await data.save();
    importCategories(child, newData.id);
  });
};

// importCategories(categories);

/**
 * @param {Array} arr
 */
const max = (arr) => {
  let max = 0;
  arr.forEach((value) => {
    // if (value.id.length > max) {
    if (value.id.toString().length > max) {
      max = value.id.toString().length;
    }
  });
  return max;
};

/**
 * @param {String} name
 */
const formatName = (name) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/đ/g, "d")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "");
};

/**
 * @param {Number} number
 */
const genPhone = (number) => {
  const len = number.toString().length;
  let phone = "03";
  let offset = 8 - len;
  while (offset) {
    const n = Math.floor(Math.random() * 10);
    phone += n;
    offset--;
  }
  phone += number;
  return phone;
};

console.log(max(users));

users.forEach((value) => {
  console.log(genPhone(value.id));
});
