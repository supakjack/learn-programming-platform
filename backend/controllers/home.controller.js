const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  getHomeSchema,
  getTaskAssignmentSchema,
} = require("./../helpers/validation.helper");

module.exports = {

  // function name: get
  // description: get problems data from condition by id
  // input : query string : condition {problemId}
  // output :
  // CreateBy: Niphitphon Thanatkulkit / CreateDate: 24/2/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 24/2/2021
  get: async (req, res, next) => {

    // passing data from query string validate data from getTagSchema
    const getHomeData = await getHomeSchema.validateAsync(req.query);


    // try call function getTagById in tags model then catch if error
    try {
      const doesGetSome = await globalModel.select({
        name: "users",
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
        condition: [getHomeData],
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
  }, // function name: get
  // description: get problems data from condition by id
  // input : query string : condition {problemId}
  // output :
  // CreateBy: Yotsapat Phurahong / CreateDate:
  // UpdateBy: Yotsapat Phurahong / UpdateDate:
  getProblem: async (req, res, next) => {
    // passing data from query string validate data from
    // console.log("params : " + req.params.assignmentId);
    const getCondition = await getTaskAssignmentSchema.validateAsync(
      req.params
    );
    console.log("asdasdasd" + getCondition);
    // try call function getTagById in tags model then catch if error
    try {
      const doesGetProblem = await globalModel.select({
        name: "tasks",
        condition: [getCondition],
        filter: [
          "taskScore",
          "taskLimit",
          "problemId",
          "problemTitle",
          "problemDiscription",
          "tagName",
        ],
        leftJoin: [
          {
            joinTable: "problems",
            leftTableName: "tasks",
            leftKey: "taskProblemId",
            joinKey: "problemId",
          },
          {
            joinTable: "hashtags",
            leftTableName: "problems",
            leftKey: "problemId",
            joinKey: "hashtagProblemId",
          },
          {
            joinTable: "tags",
            leftTableName: "hashtags",
            leftKey: "hashtagTagId",
            joinKey: "tagId",
          },
        ],
      });
      res.status(201).send({ doesGetProblem });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
