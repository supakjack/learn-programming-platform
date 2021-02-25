const express = require("express");
const router = express.Router();
const testsetController = require("../controllers/testset.controller");

// Get homework
router.get("/", testsetController.get);

module.exports = router;
