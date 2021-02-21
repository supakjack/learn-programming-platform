const express = require("express");
const router = express.Router();
const homeworkController = require("../controllers/homework.controller");

// Get homework
router.get("/", homeworkController.get);

//Get Problem
router.get("/:taskAssignmentId", homeworkController.getProblem);

module.exports = router;
