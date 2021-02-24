const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// Create a new tag by tagCreateBy
router.post("/", courseController.create);

// update a tag by condition
router.patch("/", courseController.update);

// Get tag by condition
// router.get("/year", courseController.getByYear);

router.get("/", courseController.get);

module.exports = router;
