const mongoose = require("mongoose");
const slugify = require("slugify");
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You must add a title"],
    trim: true,
    maxlength: [50, "Title can not be more than 50 characters"],
  },
  slug: String,
  content: {
    type: String,
    required: [true, "You must add content"],
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

  category: {
    type: String,
    required: [true, "You must add a category"],
    maxlength: [50, "Content can not be more than 50 characters"],
  },
  tag: {
    type: String,
    required: [true, "You must add a tag"],
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.plugin(mongoosePaginate);

PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Create the model using mongoose.model, applying the plugin
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
