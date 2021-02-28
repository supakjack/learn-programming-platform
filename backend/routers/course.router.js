const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller')

// router.patch("/", courseController.update);

router.get('/', courseController.get)

router.post('/', courseController.create)

router.put('/', courseController.update)

module.exports = router
