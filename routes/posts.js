const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postPhotoUpload,
} = require("../controllers/posts");

const Post = require("../models/Post");

const categoryRouter = require("./categories");
const tagRouter = require("./tags");
const commentRouter = require("./comments");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use("/:postId/categories", categoryRouter);
router.use("/:postId/tags", tagRouter);
router.use("/:postId/comments", commentRouter);

router
  .route("/:id/photo")
  .put(protect, authorize("modifier", "admin"), postPhotoUpload);

router
  .route("/")
  .get(advancedResults(Post, "category tag"), getPosts)
  .post(protect, authorize("admin", "modifier"), createPost);

router
  .route("/:id")
  .get(protect,authorize("admin","modifier","editor"),getPost)
  .put(protect, authorize("admin", "modifier"), updatePost)
  .delete(protect, authorize("admin", "modifier"), deletePost);

module.exports = router;
