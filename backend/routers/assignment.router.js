const express = require('express')
const router = express.Router()
const assignmentController = require('./../controllers/assignment.controller')
const timeout = require('connect-timeout')

router.get('/foo', timeout('5s'), assignmentController.foo)

module.exports = router
