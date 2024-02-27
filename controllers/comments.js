const Comment = require("../models/Comment");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Post = require("../models/Post");

exports.getComments = asyncHandler(async (req, res, next) => {
  const comment = await Comment.find();
  res.status(200).json({ success: true, data: comment });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: comment });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user && user.loggedIn === "fb") {
    const { comment } = req.body; 
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return next(new ErrorResponse(`Post not found with id ${postId}`, 404));
    }
    
    // Create a new comment and associate it with the post
    const newComment = await Comment.create({
      comment,
      user: req.user.id,
      post: postId,
    });

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ success: true, data: newComment });
  } else {
    return next(
      new ErrorResponse("User is not registered through Facebook", 401)
    );
  }
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id ${req.params.id}`, 404)
    );
  }
  if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update comment`, 401));
  }
  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: comment });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id ${req.params.id}`, 404)
    );
  }
  if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to delete comment`, 401));
  }
  comment = await Comment.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
