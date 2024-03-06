const express = require("express");

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const Post=require("../models/Post");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");


router.use(protect);
router.use(authorize("admin", "modifier", "editor"));

router
  .route("/")
  .get(advancedResults(Post), getPosts)
  .post(protect, authorize("admin", "editor"), createPost);

router
  .route("/:id")
  .get(protect, getPost)
  .put(protect, authorize("admin", "modifier"), updatePost)
  .delete(protect, authorize("admin", "modifier"), deletePost);

module.exports = router;
