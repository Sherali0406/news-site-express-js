const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const Post = require("../models/Post");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Post), getPosts)
  .post(protect, authorize("admin", "modifier"), createPost);

router
  .route("/:id")
  .get(protect, getPost)
  .put(protect, authorize("admin", "modifier"), updatePost)
  .delete(protect, authorize("admin", "modifier"), deletePost);

module.exports = router;
