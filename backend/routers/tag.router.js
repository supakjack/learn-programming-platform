const express = require('express')
const router = express.Router()
const tagController = require('./../controllers/tag.controller')
const timeout = require('connect-timeout')

router.get('/foo', timeout('5s'), tagController.foo)

module.exports = router
