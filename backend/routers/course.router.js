const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// router.post("/", courseController.create);

// router.patch("/", courseController.update);

router.get("/", courseController.get);

module.exports = router;
