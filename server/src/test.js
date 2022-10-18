const dotenv = require("dotenv");
const mongoose = require("mongoose");
const validator = require("validator").default;

// const categories = require("./data/data/categories.json");
const products = require("./data/data/products.json");
// const users = require("./data/data/user.json");

const Book = require("./models/book");
const Category = require("./models/category");
const Comment = require("./models/comment");
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

/**
 * @param {Array} attributes
 * @param {String} name
 * @param {String} code
 */
const getAttribute = (attributes, name, code) => {
  const obj = {};
  const value = attributes.find((attr) => attr.code === code) || {};
  obj[name] = value.value || "";
  return obj;
};

const getAttributes = (attributes) => {
  return {
    ...getAttribute(attributes, "supplier", "publisher_vn"),
    ...getAttribute(attributes, "publisher", "manufacturer"),
    ...getAttribute(attributes, "bookCover", "book_cover"),
    ...getAttribute(attributes, "isbn13", "isbn13"),
    ...getAttribute(attributes, "isbn", "isbn10"),
    ...getAttribute(attributes, "translators", "dich_gia"),
  };
};

/**
 * @param {Array} comments
 * @param {String} book
 */
const importComments = (comments, book) => {
  comments.forEach(async (value, index) => {
    let { id, rate, content, userId, images } = value;
    images = images.map((v) => v.full_path);
    try {
      const user = await User.findOne({ fakeId: userId });
      const data = new Comment({
        rate,
        content,
        user: user.id,
        book,
        images,
      });
      // console.log({ id, rate, content, user: user.id, book, images });
      // console.log(data);
      await data.save();
    } catch (error) {
      console.error({
        type: "comment",
        index,
        id,
        message: error.message,
      });
    }
  });
};

/**
 * @param {Array} products
 */
const importProducts = (products, category) => {
  products.forEach(async (value, index) => {
    const {
      id,
      name,
      shortDescription,
      description,
      discountRate,
      prePrice,
      img = [],
      attributes = [],
      comments = [],
    } = value;
    try {
      const book = await Book.findOne({ name });
      if (comments.length) {
        importComments(comments, book.id);
      }
    } catch (error) {
      console.error({
        type: "book",
        index,
        name,
        message: error.message,
      });
    }
  });
};

/**
 * @param {Array} products
 */
const getCategories = (products) => {
  products.forEach(async (value, index) => {
    setTimeout(async () => {
      const { idCore, products } = value;
      try {
        const category = await Category.findOne({ fakeId: idCore });
        importProducts(products, category.id);
      } catch (error) {
        console.error({
          name: "category",
          index,
          idCore,
          message: error.message,
        });
      }
    }, 60000);
  });
};

// p => 38202
// c => 217034

// getCategories(products);
startMongo(getCategories, products);
