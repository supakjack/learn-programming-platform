const express = require("express");
const router = express.Router();
const hashtagController = require("../controllers/hashtag.controller");

// Create a new hashtag by tagCreateBy
// router.post("/", hashtagController.create);

// update a hashtag by condition
// router.patch("/", hashtagController.update);

// Get hashtag by condition
router.get("/", hashtagController.get);

module.exports = router;
