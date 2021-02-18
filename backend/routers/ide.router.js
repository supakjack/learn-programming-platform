const express = require('express')
const router = express.Router()
const ideController = require('../controllers/ide.controller')

// compile by source and path
router.post('/run', ideController.run)

// compile by source and path
router.post('/submit', ideController.submit)

// testset by testsetId and filePath
router.post('/testset', ideController.testset)

// createlog by a set of testset result and task data
router.post('/create', ideController.create)
module.exports = router
