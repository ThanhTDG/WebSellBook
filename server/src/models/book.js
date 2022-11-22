const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const paginate = require("mongoose-paginate-v2");
const slug = require("mongoose-slug-updater");

mongoose.plugin(aggregatePaginate);
mongoose.plugin(paginate);
mongoose.plugin(slug);

const { BOOK_STATUS } = require("../constants");

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortDescription: String,
    description: String,
    slug: {
      type: String,
      slug: "name",
    },
    authors: {
      type: String,
      // type: [String],
      // get: (value) => value.join(", "),
      // set: (value) => value.split(",").map((ele) => ele.trim()),
    },
    translators: {
      type: String,
      // type: [String],
      // get: (value) => value.join(", "),
      // set: (value) => value.split(",").map((ele) => ele.trim()),
    },
    sku: {
      type: String,
      // required: true,
      // unique: true,
    },
    isbn13: {
      type: String,
      // required: true,
      // unique: true,
    },
    isbn10: {
      type: String,
      // required: true,
      // unique: true,
    },
    supplier: String,
    publisher: String,
    publishDate: Date,
    // language: String,
    images: [String],
    weight: Number,
    height: Number,
    width: Number,
    page: Number,
    bookCover: String,
    status: {
      type: String,
      enum: Object.values(BOOK_STATUS),
      default: BOOK_STATUS.AVAILABLE,
    },
    expectedDate: Date,
    countInStock: Number,
    sold: Number,
    originalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    discountRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tree: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

bookSchema.index({ name: "text" });

bookSchema.virtual("shortDes").get(function () {
  const des = this.description;
  if (des.length < 200) {
    return des;
  }
  return des.slice(0, 200) + "...";
});

bookSchema.virtual("dimension").get(function () {
  if (this.height && this.width) return `${this.height} x ${this.width} cm`;
});

bookSchema.virtual("numOfReviews", {
  ref: "Comment",
  localField: "_id",
  foreignField: "book",
  count: true,
});

bookSchema
  .virtual("rating", {
    ref: "Comment",
    localField: "_id",
    foreignField: "book",
  })
  .get(function (arr) {
    let sum = 0;
    arr.forEach((value) => {
      sum += value.rate;
    });

    const len = arr.length;
    const rating = (sum / len).toFixed(1);

    return len ? parseFloat(rating) : 0;
  });

bookSchema
  .virtual("ratingRate", {
    ref: "Comment",
    localField: "_id",
    foreignField: "book",
  })
  .get(function (arr) {
    const rates = Array(5)
      .fill()
      .map((_) => ({ amount: 0, rate: 0 }));
    arr.forEach((value) => rates[value.rate - 1].amount++);

    const len = arr.length;
    for (let i = 0; i < rates.length; i++) {
      const rate = (rates[i].amount / len) * 100;
      rates[i].rate = len ? Math.round(rate) : 0;
    }

    return rates;
  });

/**
 * Get price of book
 * @param {number} originalPrice Original price
 * @param {number} discountRate Discount rate
 */
const getPrice = (originalPrice, discountRate) => {
  const price = originalPrice * (1 - discountRate / 100);
  return Math.round(price / 1e3) * 1e3;
};

bookSchema.pre("save", async function (next) {
  if (this.isModified("originalPrice") || this.isModified("discountRate")) {
    this.price = getPrice(this.originalPrice, this.discountRate);
  }

  try {
    await this.populate("category");
    this.tree = [this.category.id, ...this.category.tree];
    this.depopulate("category");

    next();
  } catch (error) {
    next(error);
  }
});

bookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  update.price = getPrice(update.originalPrice, update.discountRate);

  try {
    await update.populate("category");
    update.tree = [update.category.id, ...update.category.tree];
    update.depopulate("category");

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Book", bookSchema);
