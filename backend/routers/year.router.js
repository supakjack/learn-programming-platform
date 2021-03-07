const express = require("express");
const router = express.Router();
const yearController = require("../controllers/year.controller");

router.put("/", yearController.update);

router.post("/get", yearController.get);

router.post("/add", yearController.add);

module.exports = router;
