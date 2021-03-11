const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
//Retrieve user by id
router.post("/username", userController.findByUsername);

// Retrieve all users
router.get("/", userController.findAll);

// Create a new user
router.post("/", userController.create);

// Update a user with id
router.patch("/", userController.update);

//Upload file excel (insert user + enroll)
router.post("/upload", userController.upload);

//Retrieve user from course
router.post("/course", userController.getUserByCourse);
module.exports = router;
