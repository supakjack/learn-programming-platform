const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

// Get homework
router.get("/", homeController.get);

//Get Problem
// router.get("/:taskAssignmentId", homeController.getProblem);

module.exports = router;
