const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  getTestsetSchema,
  getCompilelogSchema,
} = require("../helpers/validation.helper");

module.exports = {
  // function name: get
  // description: get problems data from condition by id
  // input : query string : condition {problemId}
  // output :
  // CreateBy: Yotsapat Phurahong / CreateDate:
  // UpdateBy: Yotsapat Phurahong / UpdateDate:
  get: async (req, res, next) => {
    // passing data from query string validate data from
    const getCondition = await getTestsetSchema.validateAsync(req.body);
    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "testsets",
        condition: [getCondition],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  getCompilelog: async (req, res, next) => {
    // passing data from query string validate data from
    const getCondition = await getCompilelogSchema.validateAsync(req.body);
    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "compilelogs",
        condition: [getCondition],
      });

      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
