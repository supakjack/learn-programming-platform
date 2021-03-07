const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/username", userController.findByUsername);

// Retrieve all users
router.get("/", userController.findAll);
// Create a new user
router.post("/", userController.create);

// router.get("/username", userController.findById);
// Update a user with id
router.patch("/", userController.update);

router.post("/upload", userController.upload);

router.post("/course", userController.getUserByCourse);
module.exports = router;
