const Category = require("../models/Category");
const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate({
    path: "post",
    select: "title content",
  });
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

exports.addCategory = asyncHandler(async (req, res, next) => {
  const { name, description, user } = req.body;
  req.body.user = req.user.id;

  const postId = req.params.postId;
  const post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorResponse(`Post not found with id ${postId}`, 404));
  }

  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    console.log("65e4a692819e5c61295cf9a2");
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a category to post ${post._id}`,
        401
      )
    );
  }
  const newCategory = await Category.create({
    name,
    description,
    user,
    post: postId,
  });
  post.categories.push(newCategory._id);
  await post.save();
  res.status(201).json({ success: true, data: newCategory });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  if (category.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update category ${category._id}`,
        401
      )
    );
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: category });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is category owner
  if (category.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete category ${category._id}`,
        401
      )
    );
  }
  category = await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
