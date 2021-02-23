const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const isNumber = require("is-number");
const ad = require("../configs/ldap.config");

module.exports = {
  login: async (req, res, next) => {
    // console.log(req.body);
    try {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (user) {
          console.log(typeof user.username);
          if (isNumber(user.username)) {
            const permission = ["student"];
            const token = jwt.sign(user, "your_jwt_secret");
            return res.json({ user, token, permission });
          } else {
            const permission = ["student", "teacher"];
            const token = jwt.sign(user, "your_jwt_secret");
            return res.json({ user, token, permission });
          }
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },
  findUser: async (req, res, next) => {
    console.log(req.params);
    try {
      if (req.params) {
        var accountName = req.params.username;
        // Find user by a sAMAccountName
        ad.findUser(accountName, function (err, user) {
          if (err) {
            console.log("ERROR: " + JSON.stringify(err));
            return;
          }

          if (!user) {
            console.log("User: " + accountName + " not found.");
          } else {
            res.status(201).send({ user });
          }
        });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid Username"));
      next(error);
    }
  },
};
