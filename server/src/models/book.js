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
      height: Number,
      width: Number,
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
    },
    tree: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    fakeId: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

bookSchema.virtual("image").get(function () {
  return this.images[0] || null;
});

bookSchema.virtual("total").get(function () {
  return this.originalPrice * (1 - this.discountRate / 100);
});

bookSchema.pre("save", async function (next) {
  try {
    if (this.category) {
      await this.populate("category");
      this.tree = [this.category.id, ...this.category.tree];
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Book", bookSchema);
