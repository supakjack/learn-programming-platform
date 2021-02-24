const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  getCourseSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  get: async (req, res, next) => {
    const getCondition = await getCourseSchema.validateAsync(req.query);
    console.log(getCondition);
    try {
      const doesGetSome = await globalModel.select({
        name: "users",
        condition: [getCondition],
        filter: [
          "userId",
          "userUsername",
          "courseId",
          "courseName",
          "courseCode",
          "courseUpdateDate",
          "sectionId",
          "sectionNumber",
          "yearId",
          "yearName",
          "yearSemester",
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
      res.status(201).send({ doesGetSome });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  create: async (req, res, next) => {
    const createTagData = await createTagSchema.validateAsync(req.body);

    try {
      const doesCreate = await globalModel.insert({
        name: "tags",
        insertData: [createTagData],
      });
      res.status(201).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  update: async (req, res, next) => {
    const updateCondition = await updateTagConditionSchema.validateAsync(
      req.query
    );
    const updateTagData = await updateTagSchema.validateAsync(req.body);
    try {
      const doesUpdate = await globalModel.update({
        name: "tags",
        condition: [updateCondition],
        updateData: [updateTagData],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
