// const express = require("express");
// const {
//   getTag,
//   getTags,
//   updateTag,
//   deleteTag,
//   addTag,
// } = require("../controllers/tags");

// const Tag = require("../models/Tag");
// const Category = require("../models/Category");

// const router = express.Router({ mergeParams: true });

// const advancedResults = require("../middleware/advancedResults");
// const { protect, authorize } = require("../middleware/auth");

// /**
//  * @swagger
//  * tags:
//  *   name: Tags
//  *   description: API endpoints related to tags
//  */

// /**
//  * @swagger
//  * /tags:
//  *   get:
//  *     summary: Get all tags
//  *     description: Retrieve a list of all tags with associated posts and categories.
//  *     responses:
//  *       200:
//  *         description: Successful operation
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   description: Whether the request was successful.
//  *                   example: true
//  *                 count:
//  *                   type: number
//  *                   description: Number of tags retrieved.
//  *                   example: 2
//  *                 data:
//  *                   type: array
//  *                   description: Array of tags.
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       // Define properties based on your Tag model
//  *       500:
//  *         description: Internal server error
//  */
// router.route("/").get(advancedResults(Tag, "post category"), getTags);

// /**
//  * @swagger
//  * /tags/{id}:
//  *   get:
//  *     summary: Get a single tag by ID
//  *     description: Retrieve details of a specific tag by its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Tag ID
//  *     responses:
//  *       200:
//  *         description: Successful operation
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   description: Whether the request was successful.
//  *                   example: true
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     // Define properties based on your Tag model
//  *       404:
//  *         description: Tag not found
//  *       500:
//  *         description: Internal server error
//  */
// router.route("/:id").get(getTag);

// /**
//  * @swagger
//  * /tags:
//  *   post:
//  *     summary: Create a new tag
//  *     description: Add a new tag to the system.
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               // Define properties based on your Tag model
//  *     responses:
//  *       201:
//  *         description: Tag created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   description: Whether the request was successful.
//  *                   example: true
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     // Define properties based on your Tag model
//  *       500:
//  *         description: Internal server error
//  */
// router.route("/").post(protect, authorize("admin", "modifier"), addTag);

// /**
//  * @swagger
//  * /tags/{id}:
//  *   put:
//  *     summary: Update a tag by ID
//  *     description: Update the details of a specific tag by its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Tag ID
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               // Define properties based on your Tag model
//  *     responses:
//  *       200:
//  *         description: Tag updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   description: Whether the request was successful.
//  *                   example: true
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     // Define properties based on your Tag model
//  *       404:
//  *         description: Tag not found
//  *       500:
//  *         description: Internal server error
//  */
// router.route("/:id").put(protect, authorize("admin", "modifier"), updateTag);

// /**
//  * @swagger
//  * /tags/{id}:
//  *   delete:
//  *     summary: Delete a tag by ID
//  *     description: Delete a specific tag by its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Tag ID
//  *     responses:
//  *       204:
//  *         description: Tag deleted successfully
//  *       404:
//  *         description: Tag not found
//  *       500:
//  *         description: Internal server error
//  */
// router.route("/:id").delete(protect, authorize("admin", "modifier"), deleteTag);

// module.exports = router;
