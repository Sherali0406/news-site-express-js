const express = require("express");
const {
  getCategories,
  getCategory,
  // createCategory,
  updateCategory,
  deleteCategory,
  addCategory,
} = require("../controllers/categories");

const Category = require("../models/Category");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// router.route("/").get(getCategories).post(createCategory);
router
  .route("/")
  .get(
    advancedResults(Category, {
      path: "post",
      select: "title content",
    }),
    getCategories
  )
  .post(protect, authorize("admin", "modifier"), addCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin", "modifier"), updateCategory)
  .delete(protect, authorize("admin", "modifier"), deleteCategory);

module.exports = router;
