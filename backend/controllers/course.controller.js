const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  getCourseSchema,
  insertCourseSchema,
  updateCourseSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  get: async (req, res, next) => {
    const getCondition = await getCourseSchema.validateAsync(req.query);
    try {
      const doesGetSome = await globalModel.select({
        name: "users",
        condition: [getCondition],
        whereNot: [{ courseStatus: "delete" }],
        filter: [
          "userId",
          "userUsername",
          "courseId",
          "courseName",
          "courseCode",
          "courseStatus",
          "courseUpdateDate",
          "yearId",
          "yearName",
          "yearSemester",
        ],
        leftJoin: [
          {
            joinTable: "courses",
            leftTableName: "users",
            leftKey: "userId",
            joinKey: "courseCreateBy",
          },
          {
            joinTable: "years",
            leftTableName: "courses",
            leftKey: "courseYearId",
            joinKey: "yearId",
          },
        ],
      });
      const doesGetYearByCreate = await globalModel.select({
        name: "years",
        condition: [
          { yearCreateBy: getCondition.userId },
          { yearStatus: "active" },
        ],
      });
      res.status(200).send({ doesGetSome, doesGetYearByCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  getStudentCourse: async (req, res, next) => {
    const getCondition = await getCourseSchema.validateAsync(req.query);
    try {
      const doesGetSome = await globalModel.select({
        name: "users",
        condition: [getCondition],
        whereNot: [{ courseStatus: "delete" }],
        filter: [
          "userId",
          "userUsername",
          "courseId",
          "courseName",
          "courseCode",
          "courseStatus",
          "courseUpdateDate",
          "yearId",
          "yearName",
          "yearSemester",
          "sectionId",
          "sectionNumber",
        ],
        leftJoin: [
          {
            joinTable: "enrolls",
            leftTableName: "users",
            leftKey: "userId",
            joinKey: "enrollUserId",
          },
          {
            joinTable: "sections",
            leftTableName: "enrolls",
            leftKey: "enrollSectionId",
            joinKey: "sectionId",
          },
          {
            joinTable: "courses",
            leftTableName: "sections",
            leftKey: "sectionCourseId",
            joinKey: "courseId",
          },
          {
            joinTable: "years",
            leftTableName: "courses",
            leftKey: "courseYearId",
            joinKey: "yearId",
          },
        ],
      });

      const doesGetYearByCreate = await globalModel.select({
        name: "years",
        condition: [{ yearCreateBy: getCondition.userId }],
      });
      res.status(200).send({ doesGetSome, doesGetYearByCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  getTeacher: async (req, res, next) => {
    const getCondition = await getCourseSchema.validateAsync(req.query);
    try {
      const doesGetSome = await globalModel.select({
        name: "users",
        condition: [getCondition],
        whereNot: [{ courseStatus: "delete" }],
        leftJoin: [
          {
            joinTable: "courses",
            leftTableName: "users",
            leftKey: "userId",
            joinKey: "courseCreateBy",
          },
          {
            joinTable: "years",
            leftTableName: "courses",
            leftKey: "courseYearId",
            joinKey: "yearId",
          },
        ],
      });

      const doesGetYearByCreate = await globalModel.select({
        name: "years",
        condition: [{ yearCreateBy: getCondition.userId }],
      });
      res.status(200).send({ doesGetSome, doesGetYearByCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  create: async (req, res, next) => {
    const insertCourseData = await insertCourseSchema.validateAsync(req.body);
    try {
      const doesCreate = await globalModel.insert({
        name: "courses",
        insertData: [insertCourseData],
      });
      res.status(201).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  update: async (req, res, next) => {
    const updateCourseData = await updateCourseSchema.validateAsync(req.body);
    const { courseId } = updateCourseData;
    try {
      const doesUpdate = await globalModel.update({
        name: "courses",
        condition: [{ courseId }],
        updateData: [updateCourseData],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  getSection: async (req, res, next) => {
    const getCondition = {
      sectionCourseId: req.params.id,
      sectionCreateBy: req.query.userId,
    };
    try {
      const doesGet = await globalModel.select({
        name: "sections",
        condition: [getCondition],
        whereNot: [{ sectionStatus: "delete" }],
        leftJoin: [
          {
            joinTable: "courses",
            leftTableName: "sections",
            leftKey: "sectionCourseId",
            joinKey: "courseId",
          },
          {
            joinTable: "years",
            leftTableName: "courses",
            leftKey: "courseYearId",
            joinKey: "yearId",
          },
        ],
      });

      res.status(200).send({ doesGet });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
