const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/section.controller");

router.post("/", sectionController.add);

module.exports = router;
