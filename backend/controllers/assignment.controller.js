const createError = require('http-errors')
const assignmentModel = require('../models/assignment.model')
const { createAssessSchema } = require('./../helpers/validation.helper')

const {
  getProblemSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  foo : async (req, res, next) => {
    try {
      
    } catch (error) {
      
    }
  },

  get: async (req, res, next) => {
    // passing data from query string validate data from 
    const getAssignmentData = await getAssignmentSchema.validateAsync(req.query);

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await assignmentModel.select({
        name: "assignment",
        condition: [getAssignmentData],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
}
