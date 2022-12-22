const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const slug = require("mongoose-slug-updater");

mongoose.plugin(paginate);
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tree: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
  },
  { timestamps: true }
);

categorySchema
  .virtual("_parent", {
    ref: "Category",
    localField: "parent",
    foreignField: "_id",
    justOne: true,
  })
  .get(function (value) {
    if (value) {
      const { _id, id, name } = value;
      return { _id, id, name };
    }
  });

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema
  .virtual("level", {
    ref: "Category",
    localField: "parent",
    foreignField: "_id",
    justOne: true,
  })
  .get(function (value) {
    return value ? 1 + value.level : 0;
  });

categorySchema.pre("save", async function (next) {
  try {
    if (this.parent) {
      await this.populate("parent");
      this.tree = [this.parent.id, ...this.parent.tree];
      this.depopulate("parent");
    }
    next();
  } catch (error) {
    next(error);
  }
});

categorySchema.pre("find", async function (next) {
  try {
    if (this.options.hasChildren === true) {
      this.populate({ path: "children", options: { hasChildren: true } });
    }
    this.populate("level");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Category", categorySchema);
