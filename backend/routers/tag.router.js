const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");

// Create a new tag by tagCreateBy
router.post("/api/:tagCreateBy/create/", tagController.create);

// Update a tag by tagCreateBy
router.get("/api/:tagCreateBy/update/:tagId", tagController.update);

// Delete a tag by tagCreateBy
router.delete("/api/:tagCreateBy/delete/:tagId", tagController.delete);

// Get all tag by tagCreateBy
router.get("/api/:tagCreateBy/getAll/", tagController.getAlltagById);

// Get all tags
router.get("/api/getAll/", tagController.getAll);

// Get single tag
router.get("/api/:tagCreateBy/getTag/:tagId", tagController.getTag);

module.exports = router;
