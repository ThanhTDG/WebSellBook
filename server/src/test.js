const dotenv = require("dotenv");
const mongoose = require("mongoose");
const validator = require("validator").default;

// const categories = require("./data/data/categories.json");
const products = require("./data/data/products.json");
const users = require("./data/data/user.json");

const Category = require("./models/category");
const User = require("./models/user");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB");
//   })
//   .catch((err) => console.log(err));

// Database connection
const startMongo = (cb, arg) => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB");
      cb(arg);
    })
    .catch((err) => console.log(err));
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
  let phone = "09";
  let offset = 8 - len;
  while (offset) {
    const n = Math.floor(Math.random() * 10);
    phone += n;
    offset--;
  }
  phone += number;
  return phone;
};

/**
 * @param {Number} num
 * @param {Number} places
 */
const zeroPad = (num, places) => String(num).padStart(places, "0");

/**
 * @param {String} name
 * @param {Date} date
 */
const genEmail = (name, date) => {
  name = formatName(name);
  name += date.getFullYear();
  const rd = Math.floor(Math.random() * 100);
  name += zeroPad(rd, 2);
  return `${name}@gmail.com.vn`;
};

/**
 * @param {String} name
 */
const splitName = (name) => {
  name = name.trim();
  name = name || "Nguyen Anh";
  const split = name.split(" ");
  let lastName = split.slice(0, -1).join(" ");
  let firstName = split.slice(-1).join(" ");
  if (split.length === 1) {
    lastName = split[0];
    firstName = split[0];
  }
  return { firstName, lastName };
};

/**
 * @param {Array} users
 */
const importUsers = async (users) => {
  console.log(users.length);
  users.forEach(async (value) => {
    // if (index !== 0) return;
    let { id, name = "Nguyen Anh", birthD } = value;
    name = name.trim();
    name = name.replace(/[.,\/#!$%\^&\*;:{}=\\-_`~()]/g, "");
    const date = new Date(birthD);
    const phone = genPhone(id);
    const email = genEmail(name, date);
    const { firstName, lastName } = splitName(name);
    const data = new User({
      firstName,
      lastName,
      email,
      phone,
      password: "khachhang",
      birthday: date,
      fakeId: id,
    });
    try {
      const newData = await data.save();
      // console.log("ok");
    } catch (error) {
      console.log({
        id,
        message: error.message,
      });
    }
  });
};

// startMongo(importUsers, users);

/**
 * @param {Array} products
 */
const importProducts = (products) => {
  
};

/**
 * @param {Array} products
 */
const getCategories = (products) => {
  // products.forEach((value) => {
  //   if (value.idTag !== value.idCore) {
  //     console.log(value.idTag, value.idCore);
  //   }
  // });
  const p = products[0].products;
  p.forEach((value) => {
    console.log(value.img);
  });
};

// const cp_keys = [
//   "language", x
//   "idCategory", x
//   "idTag", x
//   "idCore",
//   "products",
//   "link", x
// ];

const p_keys = [
  "id",
  "name",
  "shortDescription",
  "currentPrice",
  "discountRate",
  "prePrice",
  "dayAgoCreated",
  "sold",
  "reviewCount",
  "img",
  "attributes",
  "commentCount",
  "seller",
  "description",
  "comments",
];

getCategories(products);
