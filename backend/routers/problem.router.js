const express = require('express')
const router = express.Router()
const problemController = require('../controllers/problem.controller')

// compile by source and path
router.post('/assess', problemController.assess)

module.exports = router
