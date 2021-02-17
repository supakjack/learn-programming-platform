const createError = require("http-errors");
const ad = require("../configs/ldap.config");

module.exports = {
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
            // console.log("Firstname: ", user.givenName);
            // console.log("Lastname: ", user.sn);
            // console.log("Username: ", user.sAMAccountName);
            // console.log("Email: ", user.mail);

            // return res.json({ user });
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
