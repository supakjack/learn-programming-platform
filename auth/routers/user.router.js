const express = require('express')
const router = express.Router()
const userController = require('./../controllers/user.controller')

router.get('/getUser/:username', userController.findUser)

module.exports = router
