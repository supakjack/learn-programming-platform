const express = require('express')
const router = express.Router()
const problemController = require('../controllers/problem.controller')

// compile by source and path
router.post('/assess', problemController.assess)

// Get problem by condition
router.get("/", problemController.get);

// update a problem by condition
router.patch("/", problemController.update);

module.exports = router
