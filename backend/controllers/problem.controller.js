const createError = require("http-errors");
const problemsModel = require("../models/problems.model");
const globalModel = require("../models/global.model");
const { createAssessSchema } = require("./../helpers/validation.helper");

const {
  getProblemSchema,
  updateProblemSchema,
  updateProblemConditionSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  create: async (req, res, next) => {
    // passing data from body and valid by createProblemSchema
    const createTagData = await createProblemSchema.validateAsync(req.body);

    // try call function createTag in global model then catch if error
    try {
      const doesCreate = await globalModel.insert({
        name: "tags",
        insertData: [createTagData],
      });
      res.status(200).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },


  assess: async (req, res, next) => {
    // passing data from body and valid by createAssessData
    const createAssessData = await createAssessSchema.validateAsync(req.body);

    // try call function createTag in assesses model then catch if error
    try {
      const doesCreate = await globalModel.insert({
        name: "assesses",
        insertData: [createAssessData],
      });
      res.status(201).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  // function name: get
  // description: get problems data from condition by id
  // input : query string : condition {problemId}
  // output :
  // CreateBy: Yotsapat Phurahong / CreateDate:
  // UpdateBy: Yotsapat Phurahong / UpdateDate:
  get: async (req, res, next) => {
    // passing data from query string validate data from
    const getProblemData = await getProblemSchema.validateAsync(req.query);

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "problems",
        condition: [getProblemData],
        whereNot: [{ problemStatus: "delete" }],
        leftJoin: [
          {
            joinTable: "tasks",
            leftKey: "problemId",
            joinKey: "taskProblemId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  update: async (req, res, next) => {
    const updateCondition = await updateProblemConditionSchema.validateAsync(
      req.query
    );
    const updateProblemData = await updateProblemSchema.validateAsync(req.body);
    // try call function deleteProblem in global model then catch if error
    try {
      const doesUpdate = await globalModel.update({
        name: "problems",
        condition: [updateCondition],
        updateData: [updateProblemData],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
