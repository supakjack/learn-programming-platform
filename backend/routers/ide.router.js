const express = require('express')
const router = express.Router()
const ideController = require('../controllers/ide.controller')

// compile by source
router.post('/run', ideController.run)

module.exports = router
