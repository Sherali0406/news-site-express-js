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
  req.body.post = req.params.postId;

  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse("no post with the id of ${req.params.postId}"),
      404
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a category to post ${post._id}`,
        401
      )
    );
  }

  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
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
