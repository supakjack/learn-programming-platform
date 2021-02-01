const express = require('express')
const router = express.Router()
const assignmentController = require('./../controllers/assignment.controller')
const timeout = require('connect-timeout')

router.get('/foo', timeout('5s'), assignmentController.foo)

// Get tag by condition
router.get("/", assignmentController.get);

module.exports = router
