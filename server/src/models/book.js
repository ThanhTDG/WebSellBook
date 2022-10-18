const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const slug = require("mongoose-slug-updater");

mongoose.plugin(paginate);
mongoose.plugin(slug);

const { BOOK_STATUS } = require("../utils/constants");

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
    description: String,
    slug: {
      type: String,
      slug: "name",
    },
    authors: {
      type: [String],
      get: (value) => value.join(", "),
      set: (value) => value.split(",").map((ele) => ele.trim()),
    },
    translators: {
      type: [String],
      get: (value) => value.join(", "),
      set: (value) => value.split(",").map((ele) => ele.trim()),
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    supplier: String,
    publisher: String,
    publishDate: Date,
    language: String,
    images: [String],
    weight: Number,
    size: {
      height: Number,
      width: Number,
    },
    page: Number,
    status: {
      type: String,
      enum: Object.values(BOOK_STATUS),
      default: BOOK_STATUS.AVAILABLE,
    },
    expectedDate: Date,
    countInStock: Number,
    price: Number,
    discountRate: Number,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

bookSchema.virtual("image").get(function () {
  return this.images[0] || null;
});

bookSchema.virtual("total").get(function () {
  return this.price * (1 - this.discountRate / 100);
});

module.exports = mongoose.model("Book", bookSchema);
