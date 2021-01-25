const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()
require('./configs/passport.config')

const authRoute = require('./routers/auth.router')
const serviceRoute = require('./routers/service.router')

const app = express()

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './logs/access.log'),
  { flags: 'a' }
)

app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRoute)
app.use('/service', serviceRoute)

app.use(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.send({ passport: req.user })
  }
)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
