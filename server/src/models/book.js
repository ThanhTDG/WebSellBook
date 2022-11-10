const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const slug = require("mongoose-slug-updater");

mongoose.plugin(paginate);
mongoose.plugin(slug);

const { BOOK_STATUS } = require("../constants");

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const dimensionSchema = new Schema(
  {
    height: Number,
    width: Number,
  },
  { _id: false }
);

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
    dimension: {
      type: dimensionSchema,
      get: (value) => {
        if (value) return `${value.height} x ${value.width} cm`;
      },
    },
    page: Number,
    bookCover: String,
    status: {
      type: String,
      enum: Object.values(BOOK_STATUS),
      default: BOOK_STATUS.AVAILABLE,
    },
    expectedDate: Date,
    countInStock: Number,
    originalPrice: Number,
    discountRate: Number,
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
  { timestamps: true }
);

bookSchema.virtual("shortDes").get(function () {
  const des = this.description;
  if (des.length < 200) {
    return des;
  }
  return des.slice(0, 200) + "...";
});

bookSchema.virtual("price").get(function () {
  const price = this.originalPrice * (1 - this.discountRate / 100);
  return Math.round(price / 1e3) * 1e3;
});

bookSchema.pre("save", async function (next) {
  try {
    if (this.category) {
      await this.populate("category");
      this.tree = [this.category.id, ...this.category.tree];
      this.depopulate("category");
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Book", bookSchema);
