const Tag = require("../models/Tag");
const Post = require("../models/Post");
const Category = require("../models/Category");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getTags = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTag = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id).populate("category post");
  if (!tag) {
    return next(
      new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: tag });
});

exports.addTag = asyncHandler(async (req, res, next) => {
  req.body.post = req.params.postId; 
  // req.body.user = req.user.id;
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
        `User ${req.user.id} is not authorized to add a tag to post ${post._id}`,
        401
      )
    );
  }

  const tag = await Tag.create(req.body);
  res.status(201).json({ success: true, data: tag });
});

exports.updateTag = asyncHandler(async (req, res, next) => {
  let tag = await Tag.findById(req.params.id);
  if (!tag) {
    return next(
      new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404)
    );
  }

  if (tag.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update tag ${tag._id}`,
        401
      )
    );
  }

  tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: tag });
});

exports.deleteTag = asyncHandler(async (req, res, next) => {
  let tag = await Tag.findById(req.params.id);
  if (!tag) {
    return next(
      new ErrorResponse(`Tag not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tag owner
  if (tag.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete tag ${tag._id}`,
        401
      )
    );
  }
  tag = await Tag.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
