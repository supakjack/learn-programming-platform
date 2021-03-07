const createError = require("http-errors");
const globalModel = require("../models/global.model");

const {
  getAssignmentSchema,
  getTaskAssignmentSchema,
  getAssignmentByUserIdSchema,
  getScoreUserSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  // function name: get
  // description: get assignments data from condition by id
  // input : query string : condition {assignmentId}
  // output :
  // CreateBy: Yotsapat Phurahong
  get: async (req, res, next) => {
    // passing data from query string validate data from

    // try call function getAssignmentsById in tags model then catch if error
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
        whereNot: [{ taskId: null }],
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
  },
  getAssignment: async (req, res, next) => {
    // passing data from query string validate data from
    const getCondition = await getAssignmentByUserIdSchema.validateAsync(
      req.body
    );
    // try call function getAssignmentsById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "assignments",
        filter: [
          "assignmentId",
          "assignmentTitle",
          "assignmentStatus",
          "assignmentStartDate",
          "assignmentEndDate",
          "taskScore",
          "taskId",
          "enrollUserId",
        ],
        condition: [getCondition],
        whereNot: [{ taskId: null }],
        leftJoin: [
          {
            joinTable: "tasks",
            leftTableName: "assignments",
            leftKey: "assignmentId",
            joinKey: "taskAssignmentId",
          },
          {
            joinTable: "sections",
            leftTableName: "assignments",
            leftKey: "assignmentSectionId",
            joinKey: "sectionId",
          },
          {
            joinTable: "enrolls",
            leftTableName: "sections",
            leftKey: "sectionId",
            joinKey: "enrollSectionId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  getScoreAssignment: async (req, res, next) => {
    // passing data from query string validate data from
    const getCondition = await getScoreUserSchema.validateAsync(req.body);
    // try call function getAssignmentsById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "tasks",
        filter: [
          "taskId",
          "taskScore",
          "taskAssignmentId",
          "compilelogId",
          "compilelogScore",
          "compilelogTestResult",
          "compilelogCreateBy",
          "compilelogSubmitNo",
        ],
        condition: [getCondition],
        orderBy: [{ name: "compilelogId", type: "DESC" }],
        limit: [{ size: 1 }],
        whereNot: [{ taskId: null }],
        leftJoin: [
          {
            joinTable: "compilelogs",
            leftTableName: "tasks",
            leftKey: "taskId",
            joinKey: "compilelogTaskId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  // function name: get
  // description: get problems data from condition by id
  // input : query string : condition {problemId}
  // output :
  // CreateBy: Yotsapat Phurahong
  getProblem: async (req, res, next) => {
    // passing data from query string validate data from
    // console.log("params : " + req.params.assignmentId);
    const getCondition = await getTaskAssignmentSchema.validateAsync(
      req.params
    );
    // try call function getTaskById in tags model then catch if error
    try {
      const doesGetProblem = await globalModel.select({
        name: "tasks",
        condition: [getCondition],
        groupBy: [{ name: "taskId" }],
        filter: [
          "assignmentId",
          "assignmentTitle",
          "taskId",
          "taskScore",
          "taskLimit",
          "problemId",
          "problemTitle",
          "problemDescription",
          "tagName",
        ],
        leftJoin: [
          {
            joinTable: "assignments",
            leftTableName: "tasks",
            leftKey: "taskAssignmentId",
            joinKey: "assignmentId",
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
