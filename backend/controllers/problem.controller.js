const createError = require('http-errors')
const problemsModel = require('../models/problems.model')
const { createAssessSchema } = require('./../helpers/validation.helper')

const {
  getProblemSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  assess: async (req, res, next) => {
    // passing data from body and valid by createAssessData
    const createAssessData = await createAssessSchema.validateAsync(req.body)

    // try call function createTag in assesses model then catch if error
    try {
      const doesCreate = await globalModel.insert({
        name: 'assesses',
        insertData: [createAssessData]
      })
      res.status(201).send({ doesCreate })
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError())
      next(error)
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
      const doesGetAll = await problemsModel.select({
        name: "problems",
        condition: [getProblemData],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
}
