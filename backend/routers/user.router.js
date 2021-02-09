const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const timeout = require("connect-timeout");

router.get("/", userController.get);
router.post("/", timeout("5s"), userController.add);
router.patch("/", timeout("5s"), userController.update);

module.exports = router;
