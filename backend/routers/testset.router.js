const express = require("express");
const router = express.Router();
const testsetController = require("../controllers/testset.controller");

// Get testset
router.post("/", testsetController.get);
// Get testsetExample
router.post("/example", testsetController.getExample);
// Get compilelog
router.post("/compilelog", testsetController.getCompilelog);

module.exports = router;
