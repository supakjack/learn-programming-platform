const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");

// Create a new tag by tagCreateBy
router.post("/", tagController.create);

// update a tag by condition
router.patch("/", tagController.update);

// Get tag by condition
router.get("/", tagController.get);

module.exports = router;
