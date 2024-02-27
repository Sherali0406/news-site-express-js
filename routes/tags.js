const express = require("express");
const {
  getTag,
  getTags,
  updateTag,
  deleteTag,
  addTag,
} = require("../controllers/tags");

const Tag = require("../models/Tag");
const Category = require("../models/Category");

const router = express.Router({ mergeParams: true });
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router
  .route("/")
  .get(advancedResults(Tag, "post category"), getTags)
  .post(protect, authorize("admin", "modifier"), addTag);

router
  .route("/:id")
  .get(getTag)
  .put(protect, authorize("admin", "modifier"), updateTag)
  .delete(protect, authorize("admin", "modifier"), deleteTag);

module.exports = router;
