const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const timeout = require("connect-timeout");

// Retrieve all users
router.get("/", userController.findAll);
// Create a new user
router.post("/", userController.create);
// router.get('/:id', userController.findById);
// Update a user with id
router.patch("/", userController.update);
// Delete a user with id

router.post("/file", userController.file);

module.exports = router;
