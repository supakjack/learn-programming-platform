const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const LocalStrategy = require('passport-local').Strategy
const ad = require('../configs/ldap.config')
const { authSchema } = require('./../helpers/validation.helper')
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const result = await authSchema.validateAsync({ username, password })
    await ad.authenticate(
      result.username + process.env.LDAP_MAIL_ADRESS,
      result.password,
      async (err, auth) => {
        if (auth) {
          return done(
            null,
            { username: result.username },
            {
              message: 'Logged In Successfully'
            }
          )
        }
        return done(null, false, { message: 'Incorrect email or password.' })
      }
    )
  })
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, cb) => {
      try {
        return cb(null, jwtPayload)
      } catch (error) {
        return cb(error, false)
      }
    }
  )
)
