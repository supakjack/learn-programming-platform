const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  getAssignmentSchema,
  getTaskAssignmentSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  // function name: get
  // description: get problems data from condition by id
  // input : query string : condition {problemId}
  // output :
  // CreateBy: Yotsapat Phurahong / CreateDate:
  // UpdateBy: Yotsapat Phurahong / UpdateDate:
  get: async (req, res, next) => {
    // passing data from query string validate data from

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "assignments",
        filter: [
          "assignmentId",
          "assignmentTitle",
          "assignmentStatus",
          "assignmentStartDate",
          "assignmentEndDate",
        ],
        groupBy: [{ name: "assignmentId" }],
        sum: [
          { name: "taskScore", newName: "sumTaskScore" },
          { name: "compilelogScore", newName: "sumCompilelogScore" },
        ],
        leftJoin: [
          {
            joinTable: "tasks",
            leftTableName: "assignments",
            leftKey: "assignmentId",
            joinKey: "taskAssignmentId",
          },
          {
            joinTable: "compilelogs",
            leftTableName: "tasks",
            leftKey: "taskId",
            joinKey: "compilelogTaskId",
          },
          {
            joinTable: "files",
            leftTableName: "compilelogs",
            leftKey: "compilelogFileId",
            joinKey: "fileId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
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
          "taskId",
          "taskScore",
          "taskLimit",
          "problemId",
          "problemTitle",
          "problemDiscription",
          "tagName",
          "compilelogScore",
          "compilelogSubmitNo",
          "compilelogTestResult",
        ],
        leftJoin: [
          {
            joinTable: "compilelogs",
            leftTableName: "tasks",
            leftKey: "taskId",
            joinKey: "compilelogTaskId",
          },
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
