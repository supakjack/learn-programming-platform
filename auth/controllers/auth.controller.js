const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = {
  login: async (req, res, next) => {
    console.log(req.body)
    try {
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err)
        if (user) {
          const token = jwt.sign(user, 'your_jwt_secret')
          return res.json({ user, token })
        } else {
          return res.status(422).json(info)
        }
      })(req, res, next)
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  }
}
