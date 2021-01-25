const express = require('express')
const router = express.Router()
const authController = require('./../controllers/auth.controller')
const timeout = require('connect-timeout')

router.post('/login', timeout('5s'), authController.login)

module.exports = router
