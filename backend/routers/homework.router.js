const express = require("express");
const router = express.Router();
const homeworkController = require("../controllers/homework.controller");

// Get homework
router.get("/", homeworkController.get);

// Get homework
router.post("/assignment", homeworkController.getAssignment);

// Get homework
router.post("/assignment/score", homeworkController.getScoreAssignment);

//Get Problem
router.get("/:taskAssignmentId", homeworkController.getProblem);

module.exports = router;
