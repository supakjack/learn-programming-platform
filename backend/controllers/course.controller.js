const createError = require('http-errors')
const globalModel = require('../models/global.model')

const {
  getCourseSchema,
  insertCourseSchema
} = require('./../helpers/validation.helper')

module.exports = {
  get: async (req, res, next) => {
    const getCondition = await getCourseSchema.validateAsync(req.query)
    console.log(getCondition)
    try {
      const doesGetSome = await globalModel.select({
        name: 'users',
        condition: [getCondition],
        filter: [
          'userId',
          'userUsername',
          'enrollId',
          'courseId',
          'courseName',
          'courseCode',
          'courseUpdateDate',
          'sectionId',
          'sectionNumber',
          'yearId',
          'yearName',
          'yearSemester'
        ],
        leftJoin: [
          {
            joinTable: 'enrolls',
            leftTableName: 'users',
            leftKey: 'userId',
            joinKey: 'enrollUserId'
          },
          {
            joinTable: 'sections',
            leftTableName: 'enrolls',
            leftKey: 'enrollSectionId',
            joinKey: 'sectionId'
          },
          {
            joinTable: 'courses',
            leftTableName: 'sections',
            leftKey: 'sectionCourseId',
            joinKey: 'courseId'
          },
          {
            joinTable: 'years',
            leftTableName: 'courses',
            leftKey: 'courseYearId',
            joinKey: 'yearId'
          }
        ]
      })
      const doesGetYearByCreate = await globalModel.select({
        name: 'years',
        condition: [{ yearCreateBy: getCondition.userId }]
      })
      const doesGetSectionByCreate = await globalModel.select({
        name: 'sections',
        condition: [{ sectionCreateBy: getCondition.userId }]
      })
      res
        .status(200)
        .send({ doesGetSome, doesGetYearByCreate, doesGetSectionByCreate })
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError())
      next(error)
    }
  },
  create: async (req, res, next) => {
    const insertCourseData = await insertCourseSchema.validateAsync(req.body)
    try {
      console.log(insertCourseData)
      const doesCreate = insertCourseData
      res.status(201).send({ doesCreate })
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError())
      next(error)
    }
  }
}
