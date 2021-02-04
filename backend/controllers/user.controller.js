const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  userSchema
} = require("../helpers/validation.helper");

module.exports = {
  get: async (req, res, next) => {
    const getUserData = await userSchema.validateAsync(req.query);
    try {
      const doseGetAll = await globalModel.select({
        name: "users",
        condition: [getUserData],
        filter: [
          userId,
          userUsername,
          userPrefixThai,
          userFirstnameThai,
          userLastnameThai,
          userCreateDate,
          userUpdateDate,
          userCreateBy,
          userUpdateBy,
          userStatus,
        ],
      });
      console.log(doseGetAll);
      res.status(201).send({ doseGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  add: async (req, res, next) => {
    const addUserData = await userSchema.validateAsync(req.body);
    try {
      const doseCreate = await globalModel.insert({
        name: "users",
        insertData: [addUserData],
      });
      res.status(200).send({ doseCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  update: async (req, res, next) => {
    const updateUser = await userSchema.validateAsync(req.query);
    try {
      const doseUpdate = await globalModel.update({
        name: "users",
        condition: [updateUser],
        updateData: [updateuserData],
      });
      res.status(200).send({ doseUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
