const createError = require("http-errors");
const globalModel = require("../models/global.model");

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
          "assignmentTitle",
          "assignmentStatus",
          "taskScore",
          "problemTitle",
          "tagUpdateDate",
          "tagName",
          "compilelogScore",
          "problemDiscription",
          "problemId",
        ],
        leftJoin: [
          {
            joinTable: "tasks",
            leftTableName: "assignments",
            leftKey: "assignmentId",
            joinKey: "taskAssignmentId",
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
            leftKey: "hashtagId",
            joinKey: "tagId",
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
};
