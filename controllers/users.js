const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const mongoosePaginate = require("mongoose-paginate-v2");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };
  const results = await User.paginate({}, options);
  res.status(200).json(results);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`user not found id ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  if (!user) {
    return next(new ErrorResponse(`user not found id ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`user not found id ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
