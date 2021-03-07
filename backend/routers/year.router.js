const express = require("express");
const router = express.Router();
const yearController = require("../controllers/year.controller");

// // Create a new tag by tagCreateBy
// router.post("/", yearController.create);

// // update a tag by condition
// router.patch("/", yearController.update);

router.post("/get", yearController.get);

router.post("/add", yearController.add);

module.exports = router;
