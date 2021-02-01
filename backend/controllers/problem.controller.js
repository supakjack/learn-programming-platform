const createError = require('http-errors')
const globalModel = require('../models/global.model')
const { createAssessSchema } = require('./../helpers/validation.helper')

module.exports = {
  assess: async (req, res, next) => {
    // passing data from body and valid by createAssessData
    const createAssessData = await createAssessSchema.validateAsync(req.body)

    // try call function createTag in assesses model then catch if error
    try {
      const doseCreate = await globalModel.insert({
        name: 'assesses',
        insertData: [createAssessData]
      })
      res.status(201).send({ doseCreate })
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError())
      next(error)
    }
  }
}
