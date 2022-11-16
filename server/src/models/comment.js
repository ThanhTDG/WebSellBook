const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

mongoose.plugin(paginate);

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    content: String,
    images: [String],
  },
  { timestamps: true }
);

commentSchema
  .virtual("_user", {
    ref: "User",
    localField: "user",
    foreignField: "_id",
    justOne: true,
  })
  .get(function (value) {
    const { fullName, avatar } = value;
    const obj = { fullName, avatar };
    return obj;
  });

module.exports = mongoose.model("Comment", commentSchema);
