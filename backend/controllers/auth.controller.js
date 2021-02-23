const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const isNumber = require('is-number');


module.exports = {
  login: async (req, res, next) => {
    // console.log(req.body);
    try {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (user) {
          console.log(typeof user.username);
          if (isNumber(user.username)) {
            console.log("if");
            const permission = ["student"];
            const token = jwt.sign(user, "your_jwt_secret");
            console.log({user, token, permission});
            return res.json({ user, token, permission });
          } else {
            console.log("else");
            const permission = ["student", "teacher"];
            const token = jwt.sign(user, "your_jwt_secret");
            console.log(token);
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
};
