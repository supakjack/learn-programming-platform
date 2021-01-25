const express = require('express')
const router = express.Router()
const proxy = require('express-http-proxy')

router.all('/account*', proxy(process.env.SERVICE_ACCOUNT_URL))
router.all('/problem-testset*', proxy(process.env.SERVICE_PROBLEM_TESTSET_URL))
router.all('/assignment*', proxy(process.env.SERVICE_ASSIGNMENT_URL))
router.all('/ide*', proxy(process.env.SERVICE_IDE_URL))
router.all('/test*', proxy(process.env.SERVICE_TEST_URL))
router.all('/dashboard*', proxy(process.env.SERVICE_DASHBOARD_URL))

module.exports = router
