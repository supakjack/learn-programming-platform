const createError = require("http-errors");
const globalModel = require("../models/global.model");

const { getYearSchema } = require("./../helpers/validation.helper");

module.exports = {
  get: async (req, res, next) => {
    const getYearData = await getYearSchema.validateAsync(req.body);
    try {
      const doesGetAll = await globalModel.select({
        name: "years",
        condition: [getYearData],
        whereNot: [{ yearStatus: "delete" }],
      });
      console.log(doesGetAll);
      res.status(200).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  add: async (req, res, next) => {
    const createYearData = req.body;

    try {
      const doesCreate = await globalModel.insert({
        name: "years",
        insertData: [createYearData],
      });
      res.status(201).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
