const createError = require("http-errors");
const problemsModel = require("../models/problems.model");
const globalModel = require("../models/global.model");
const {
  createAssessSchema,
  createProblemSchema,
  createPicturesScheme,
  createHashtagSchema,
  createTestsetsSchema,
  createFiles,
} = require("./../helpers/validation.helper");

const {
  getProblemSchema,
  updateProblemSchema,
  updateProblemConditionSchema,
} = require("./../helpers/validation.helper");

module.exports = {
  create: async (req, res, next) => {
    // passing data from body and valid by createProblemSchema
    const createProblemData = await createProblemSchema.validateAsync(
      req.body.createProblemData
    );

    // try call function createTag in global model then catch if error
    try {
      const problemId = await problemsModel.insertReturnId({
        name: "problems",
        insertData: [createProblemData],
      });
      console.log(problemId);
      //set problemId to hashtag schema
      req.body.createHashtagData.map((rowHashtag) => {
        rowHashtag.hashtagProblemId = problemId;
      });

      //insert problem
      const doesCreateHashtag = await globalModel.insert({
        name: "hashtags",
        insertData: [...req.body.createHashtagData],
      });

      //set problemId to testset schema
      req.body.createTestsetData.map((rowTestSet) => {
        rowTestSet.testsetProblemId = problemId;
      });

      //insert testset
      const doesCreateTestset = await globalModel.insert({
        name: "testsets",
        insertData: [...req.body.createTestsetData],
      });

      const createFilesData = await createFiles.validateAsync(
        req.body.createFilesData
      );

      //insert Files
      const fileId = await problemsModel.insertReturnId({
        name: "files",
        insertData: [createFilesData],
      });

      //set probleId,fileId to picture schema
      req.body.createPicturesData.pictureFileId = fileId;
      req.body.createPicturesData.pictureProblemId = problemId;
      const createPicturesData = await createPicturesScheme.validateAsync(
        req.body.createPicturesData
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
        condition: [getProblemData],
        whereNot: [{ problemStatus: "delete" }],
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
};
