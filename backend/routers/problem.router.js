const express = require('express')
const router = express.Router()
const problemController = require('../controllers/problem.controller')

// compile by source and path
router.post('/assess', problemController.assess)

// Get tag by condition
router.get("/", problemController.get);


module.exports = router
