const createError = require("http-errors");
const globalModel = require("../models/global.model");
const problemsModel = require("../models/problems.model");

const { getCourseSchema } = require("./../helpers/validation.helper");

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
          "enrollId",
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
};
