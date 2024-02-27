// models/Post.js
const mongoose = require("mongoose");
const slugify = require("slugify");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [50, "Title can not be more than 50 characters"],
    },
    slug: String,
    content: {
      type: String,
      required: [true, "Please add content"],
      maxlength: [500, "Content can not be more than 500 characters"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    publish_date: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    uniqueViews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: false,
    },
    tag: {
      type: mongoose.Schema.ObjectId,
      ref: "Tag",
      required: false,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

PostSchema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

PostSchema.virtual("tags", {
  ref: "Tag",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

module.exports = mongoose.model("Post", PostSchema);
