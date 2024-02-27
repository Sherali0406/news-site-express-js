const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/users");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(protect, advancedResults(User), getUsers)
  .post(createUser);
router
  .route("/:id")
  .get(protect, getUser)
  .put(updateUser)
  .delete(protect, authorize("admin","modifier"),deleteUser);

module.exports = router;
