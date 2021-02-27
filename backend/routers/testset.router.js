const express = require("express");
const router = express.Router();
const testsetController = require("../controllers/testset.controller");

// Get homework
router.get("/", testsetController.get);

// Get compilelog
router.get("/compilelog", testsetController.getCompilelog);

module.exports = router;
