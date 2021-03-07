const createError = require("http-errors");
const problemsModel = require("../models/problems.model");
const globalModel = require("../models/global.model");
const mkdirp = require("mkdirp");
const nanoid = require("nanoid");

const rmdir = require("rmdir");
const fs = require("fs-extra");
const {
  createAssessSchema,
  createProblemSchema,
  createPicturesScheme,
  createHashtagSchema,
  createTestsetsSchema,
  getAssignmentchema,
  getScoreUserSchema,
  createFiles,
} = require("./../helpers/validation.helper");

const {
  getProblemSchema,
  updateProblemSchema,
  updateProblemConditionSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  create: async (req, res, next) => {
    console.log(req.body.createProblemData);
    console.log(req.files);
    const singleFile = req.files ? req.files.singleFile : null;
    var createProblemDataObject = JSON.parse(req.body.createProblemData);
    var createTestsetDataObject = JSON.parse(req.body.createTestsetData);
    var createHashtagDataObject = JSON.parse(req.body.createHashtagData);
    var createFilesDataObject = JSON.parse(req.body.createFilesData);
    var createPicturesDataObject = JSON.parse(req.body.createPicturesData);
    // passing data from body and valid by createProblemSchema
    const createProblemData = await createProblemSchema.validateAsync(
      createProblemDataObject
    );

    // try call function createTag in global model then catch if error
    try {
      const problemId = await problemsModel.insertReturnId({
        name: "problems",
        insertData: [createProblemData],
      });
      console.log(problemId);
      //set problemId to hashtag schema
      createHashtagDataObject.map((rowHashtag) => {
        rowHashtag.hashtagProblemId = problemId;
      });

      //insert problem
      const doesCreateHashtag = await globalModel.insert({
        name: "hashtags",
        insertData: [...createHashtagDataObject],
      });

      //set problemId to testset schema
      createTestsetDataObject.map((rowTestSet) => {
        rowTestSet.testsetProblemId = problemId;
      });

      //insert testset
      const doesCreateTestset = await globalModel.insert({
        name: "testsets",
        insertData: [...createTestsetDataObject],
      });

      let filePath = null;
      if (singleFile) {
        filePath = process.env.BASE_STORAGE_PATH + "picture" + "\\" + problemId;
        await mkdirp(filePath);

        await singleFile.mv(filePath + "\\" + singleFile.name);
        createFilesDataObject.filePath = filePath + "\\" + singleFile.name;
      }

      const createFilesData = await createFiles.validateAsync(
        createFilesDataObject
      );

      //insert Files
      const fileId = await problemsModel.insertReturnId({
        name: "files",
        insertData: [createFilesData],
      });

      //set probleId,fileId to picture schema
      createPicturesDataObject.pictureFileId = fileId;
      createPicturesDataObject.pictureProblemId = problemId;
      const createPicturesData = await createPicturesScheme.validateAsync(
        createPicturesDataObject
      );

      //insert picture
      const doesCreatePicture = await problemsModel.insertReturnId({
        name: "pictures",
        insertData: [createPicturesData],
      });

      res.status(201).send({ doesCreatePicture });
    } catch (error) {
      console.log(error);
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  assess: async (req, res, next) => {
    // passing data from body and valid by createAssessData
    const createAssessData = await createAssessSchema.validateAsync(req.body);

    // try call function createTag in assesses model then catch if error
    try {
      const doesCreate = await globalModel.insert({
        name: "assesses",
        insertData: [createAssessData],
      });
      res.status(201).send({ doesCreate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  getUserAssignment: async (req, res, next) => {
    // passing data from query string validate data from
    const getAssignmentData = await getAssignmentchema.validateAsync(req.body);

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "assignments",
        condition: [getAssignmentData],
        filter: [
          "assignmentId",
          "assignmentTitle",
          "sectionId",
          "enrollUserId",
          "userUsername",
          "userPrefixThai",
          "userFirstNameThai",
          "userLastnameThai",
          "taskId",
        ],
        leftJoin: [
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
          {
            joinTable: "users",
            leftTableName: "enrolls",
            leftKey: "enrollUserId",
            joinKey: "userId",
          },
          {
            joinTable: "tasks",
            leftTableName: "assignments",
            leftKey: "assignmentId",
            joinKey: "taskAssignmentId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  getScoreUser: async (req, res, next) => {
    // passing data from query string validate data from
    const getScoreUserData = await getScoreUserSchema.validateAsync(req.body);

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "tasks",
        condition: [getScoreUserData],
        orderBy: [{ name: "compilelogId", type: "DESC" }],
        limit: [{ size: 1 }],
        filter: [
          "taskId",
          "taskScore",
          "taskAssignmentId",
          "compilelogId",
          "compilelogScore",
          "compilelogTestResult",
          "compilelogCreateBy",
        ],
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
  getMaxScore: async (req, res, next) => {
    // passing data from query string validate data from
    const getAssignmentData = await getAssignmentchema.validateAsync(req.body);

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "assignments",
        condition: [getAssignmentData],
        sum: [{ name: "taskScore", newName: "sumTaskScore" }],
        filter: ["assignmentId", "assignmentTitle"],
        leftJoin: [
          {
            joinTable: "tasks",
            leftTableName: "assignments",
            leftKey: "assignmentId",
            joinKey: "taskAssignmentId",
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
  // CreateBy: Yotsapat Phurahong / CreateDate:
  // UpdateBy: Yotsapat Phurahong / UpdateDate:
  get: async (req, res, next) => {
    // passing data from query string validate data from
    const getProblemData = await getProblemSchema.validateAsync(req.query);

    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "problems",
        groupBy: [{ name: "problemId" }],
        condition: [getProblemData],
        whereNot: [{ problemStatus: "delete" }],
        leftJoin: [
          {
            joinTable: "pictures",
            leftTableName: "problems",
            leftKey: "problemId",
            joinKey: "pictureProblemId",
          },
          {
            joinTable: "files",
            leftTableName: "pictures",
            leftKey: "pictureFileId",
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
  editPicture: async (req, res, next) => {
    // passing data from query string validate data from
    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "pictures",
        condition: [{ pictureProblemId: req.body.problemId }],
        leftJoin: [
          {
            joinTable: "files",
            leftTableName: "pictures",
            leftKey: "pictureFileId",
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
  editHashtag: async (req, res, next) => {
    // passing data from query string validate data from
    const getProblemData = await getProblemSchema.validateAsync(req.body);
    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "problems",
        condition: [getProblemData],
        whereNot: [{ hashtagStatus: "delete" }],
        leftJoin: [
          {
            joinTable: "hashtags",
            leftTableName: "problems",
            leftKey: "problemId",
            joinKey: "hashtagProblemId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  editTestset: async (req, res, next) => {
    // passing data from query string validate data from
    const getProblemData = await getProblemSchema.validateAsync(req.body);
    // try call function getTagById in tags model then catch if error
    try {
      const doesGetAll = await globalModel.select({
        name: "problems",
        condition: [getProblemData],
        whereNot: [{ testsetStatus: "delete" }],
        leftJoin: [
          {
            joinTable: "testsets",
            leftTableName: "problems",
            leftKey: "problemId",
            joinKey: "testsetProblemId",
          },
        ],
      });
      res.status(201).send({ doesGetAll });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },

  update: async (req, res, next) => {
    const updateCondition = await updateProblemConditionSchema.validateAsync(
      req.query
    );
    const updateProblemData = await updateProblemSchema.validateAsync(req.body);
    // try call function deleteProblem in global model then catch if error
    try {
      const doesUpdate = await globalModel.update({
        name: "problems",
        condition: [updateCondition],
        updateData: [updateProblemData],
      });
      res.status(200).send({ doesUpdate });
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  deleteAnother: async (req, res, next) => {
    // try call function deleteProblem in global model then catch if error
    console.log(req.body);
    console.log(req.query);

    try {
      req.body.hashtagId.forEach((element) => {
        const doesDeleteHashtag = globalModel.delete({
          name: "hashtags",
          condition: { hashtagId: element },
        });
      });

      req.body.testsetId.forEach((element) => {
        const doesDeleteTestset = globalModel.delete({
          name: "testsets",
          condition: { testsetId: element },
        });
      });

      if (req.body.pictureId != null) {
        const doesDeletePicture = await globalModel.delete({
          name: "pictures",
          condition: { pictureId: req.body.pictureId },
        });
        const doesDeleteFile = await globalModel.delete({
          name: "files",
          condition: { fileId: req.body.fileId },
        });
      }
      res.status(200).send(req.body);
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
  updateProblem: async (req, res, next) => {
    const singleFile = req.files ? req.files.singleFile : null;
    const updateCondition = await updateProblemConditionSchema.validateAsync(
      req.query
    );
    var updateHashtagDataObject = JSON.parse(req.body.updateHashtagData);
    var updateTestsetDataObject = JSON.parse(req.body.updateTestsetData);
    var updateProblemDataObject = JSON.parse(req.body.updateProblemData);
    if (req.body.updateFilesData != null) {
      var updateFilesDataObject = JSON.parse(req.body.updateFilesData);
      var updatePicturesDataObject = JSON.parse(req.body.updatePicturesData);
    }
    const updateProblemData = await updateProblemSchema.validateAsync(
      updateProblemDataObject
    );

    console.log(singleFile);

    // try call function deleteProblem in global model then catch if error
    try {
      const doesUpdate = await globalModel.update({
        name: "problems",
        condition: [updateCondition],
        updateData: [updateProblemData],
      });

      const doesCreateHashtag = await globalModel.insert({
        name: "hashtags",
        insertData: [...updateHashtagDataObject],
      });

      const doesCreateTestset = await globalModel.insert({
        name: "testsets",
        insertData: [...updateTestsetDataObject],
      });

      console.log(updateFilesDataObject);
      if (updateFilesDataObject != null) {
        filePath =
          process.env.BASE_STORAGE_PATH +
          "picture" +
          "\\" +
          req.query.problemId;
        console.log(filePath);
        //delete old file
        let result = await rmdir(filePath, function (err, dirs, files) {
          console.log(dirs);
          console.log(files);
          console.log("all files are removed");
        });

        //insert new file
        await mkdirp(filePath);

        await singleFile.mv(filePath + "\\" + singleFile.name);
        updateFilesDataObject.filePath = filePath + "\\" + singleFile.name;

        console.log(req.body.updateFilesData);
        const fileId = await problemsModel.insertReturnId({
          name: "files",
          insertData: [updateFilesDataObject],
        });

        updatePicturesDataObject.pictureFileId = fileId;
        const createPicturesData = await createPicturesScheme.validateAsync(
          updatePicturesDataObject
        );

        //insert picture
        const doesCreatePicture = await problemsModel.insertReturnId({
          name: "pictures",
          insertData: [createPicturesData],
        });
      }
      res.status(200).send(req.body);
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError());
      next(error);
    }
  },
};
