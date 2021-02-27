const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const isNumber = require('is-number')
// const ad = require('../configs/ldap.config')
const ladp = require('./../helpers/ldap.helper')
const globalModel = require('./../models/global.model')

module.exports = {
  login: async (req, res, next) => {
    // console.log(req.body);
    const ad = await ladp.config(req.body.username, req.body.password)
    try {
      passport.authenticate(
        'local',
        { session: false },
        async (err, user, info) => {
          if (err) return next(err)

          if (user) {
            const doesSelect = await globalModel.select({
              name: 'users',
              condition: [{ userUsername: user.username }]
            })
            if (!doesSelect.length) {
              ad.findUser(user.username, async (err, userAd) => {
                if (err) {
                  console.log('ERROR: ' + JSON.stringify(err))
                }
                const doesCreate = await globalModel.insert({
                  name: 'users',
                  insertData: [
                    {
                      userUsername: userAd.sAMAccountName,
                      userFirstnameEnglish: userAd.givenName,
                      userLastnameEnglish: userAd.sn
                    }
                  ]
                })
                if (doesCreate) {
                  const doesSelect = await globalModel.select({
                    name: 'users',
                    condition: [{ userUsername: userAd.sAMAccountName }]
                  })
                  const userId = doesSelect[0].userId
                  const userUsername = doesSelect[0].userUsername
                  const doesUpdate = await globalModel.update({
                    name: 'users',
                    condition: [{ userId: userId }],
                    updateData: [{ userCreateBy: userId, userUpdateBy: userId }]
                  })
                  if (isNumber(userUsername)) {
                    const permission = ['student']
                    const token = jwt.sign(user, 'your_jwt_secret')
                    return res.json({ user, token, permission, userId })
                  } else {
                    const permission = ['student', 'teacher']
                    const token = jwt.sign(user, 'your_jwt_secret')
                    return res.json({ user, token, permission, userId })
                  }
                }
              })
            } else {
              const userId = doesSelect[0].userId
              if (isNumber(user.username)) {
                const permission = ['student']
                const token = jwt.sign(user, 'your_jwt_secret')
                return res.json({ user, token, permission, userId })
              } else {
                const permission = ['student', 'teacher']
                const token = jwt.sign(user, 'your_jwt_secret')
                return res.json({ user, token, permission, userId })
              }
            }
          } else {
            return res.status(422).json(info)
          }
        }
      )(req, res, next)
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },
  findUser: async (req, res, next) => {
    const ad = await ladp.config(req.query.username, req.query.password)
    console.log(req.params)
    try {
      if (req.params) {
        var accountName = req.params.username
        // Find user by a sAMAccountName
        ad.findUser(accountName, function (err, user) {
          if (err) {
            console.log('ERROR: ' + JSON.stringify(err))
            return
          }

          if (!user) {
            console.log('User: ' + accountName + ' not found.')
          } else {
            res.status(201).send({ user })
          }
        })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username'))
      next(error)
    }
  }
}
