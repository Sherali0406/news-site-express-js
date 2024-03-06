const express = require("express");
const {
  getComment,
  getComments,
  updateComment,
  deleteComment,
  createComment,
} = require("../controllers/comments");

const Comment = require("../models/Comment");

const router = express.Router({ mergeParams: true }); // Add mergeParams option

// Import middlewares
const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Comment), getComments)
  .post(protect, createComment);

router
  .route("/:id")
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
