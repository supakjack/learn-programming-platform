const express = require('express')
const createError = require('http-errors')
const cors = require('cors')
require('dotenv').config()

const assignmentRoute = require('./routers/assignment.router')
const tagRoute = require('./routers/tag.router')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/assignment', assignmentRoute)
app.use('/tag', tagRoute)

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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
