const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");
const mongoosePaginate = require("mongoose-paginate-v2");

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  if (req.files) {
    const file = req.files.file;
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse("Please upload an image file", 400));
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    file.name = `photo_${req.user.id}_${Date.now()}${
      path.parse(file.name).ext
    }`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse("Problem with file upload", 500));
      }
    });

    req.body.photo = file.name;
  }

  const post = await Post.create(req.body);
  res.status(201).json({ success: true, data: post });
});

exports.getPosts = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
  const results = await Post.paginate({}, options);
  res.status(200).json(results);
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  if (!post.uniqueViews.includes(req.user.id)) {
    post.views++;
    post.uniqueViews.push(req.user.id);
    await post.save();
  }

  res.status(200).json({ success: true, data: post });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update post ${post._id}`,
        401
      )
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete post ${post._id}`,
        401
      )
    );
  }
  post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
