const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/getUser/:username', userController.findUser)

// Retrieve all users
router.get('/', userController.findAll)
// Create a new user
router.post('/', userController.create)
router.get('/:id', userController.findById)
// Update a user with id
router.patch('/', userController.update)

router.post('/upload', userController.upload)

module.exports = router
