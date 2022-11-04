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
    description: String,
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    image: String,
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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

categorySchema.methods.getChildren = async function () {

}

categorySchema.pre("save", async function (next) {
  try {
    if (this.parent) {
      await this.populate("parent");
      this.tree = [this.parent.id, ...this.parent.tree];
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Category", categorySchema);
