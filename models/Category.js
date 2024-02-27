// models/Category.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  
});

module.exports = mongoose.model("Category", CategorySchema);
