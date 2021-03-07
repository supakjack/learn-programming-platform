const express = require("express");
const router = express.Router();
const hashtagController = require("../controllers/hashtag.controller");

// Create a new tag by tagCreateBy
// router.post("/", hashtagController.create);

// update a tag by condition
// router.patch("/", hashtagController.update);

// Get tag by condition
router.get("/", hashtagController.get);

module.exports = router;
