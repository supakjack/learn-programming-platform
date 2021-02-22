const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignment.controller')
const timeout = require('connect-timeout')

// Create a new assignment by assignmentCreateBy
router.post('/', assignmentController.create);

// update assignment by condition
router.patch("/", assignmentController.update);

// Get assignment by condition ๆ
router.get("/", assignmentController.get);


module.exports = router
