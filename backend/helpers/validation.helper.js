const joi = require("@hapi/joi");

const authSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required(),
});

const updateUserConditionSchema = joi.object({
  userId: joi.number().integer().max(99999999),
});

// update user schema
const updateUserSchema = joi.object({
  userPrefixThai: joi.string().max(255),
  userFirstnameThai: joi.string().max(255),
  userLastnameThai: joi.string().max(255),
  userStatus: joi.number().integer().max(3),
});
// user schema
const userSchema = joi.object({
  userUsername: joi.string().required(),
});

// create tag schema
const createTagSchema = joi.object({
  tagName: joi.string().max(255).required(),
  tagStatus: joi.number().integer().max(3).required(),
  tagCreateBy: joi.number().integer().max(99999999).min(1).required(),
  tagUpdateBy: joi.number().integer().max(99999999).min(1).required(),
});

// get tag schema
const getTagSchema = joi.object({
  tagId: joi.number().max(99999999).min(1),
  tagCreateBy: joi.number().integer().max(99999999).min(1),
  tagStatus: joi.number().integer().max(3),
});

// filter update params schema
const updateTagConditionSchema = joi.object({
  tagId: joi.number().integer().max(99999999),
});

// update tag schema
const updateTagSchema = joi.object({
  tagName: joi.string().max(255),
  tagUpdateBy: joi.number().max(99999999).min(1),
  tagUpdateDate: joi.date().raw(),
  tagStatus: joi.number().integer().max(3),
});

// create tag schema
const createAssessSchema = joi.object({
  assessAssignmentId: joi.number().max(99999999).min(1).required(),
  assessRank: joi.number().max(3).min(1).required(),
  assessTaskProblemId: joi.number().max(3).min(1).required(),
  assessCreateBy: joi.number().max(99999999).min(1).required(),
  assessUpdateBy: joi.number().max(99999999).min(1).required(),
});

// get problem schema
const getProblemSchema = joi.object({
  problemId: joi.number().max(99999999).min(1),
});


// get assignment schema
const getAssignmentSchema = joi.object({
  assignmentId: joi.number().max(99999999).min(1),
});

// create compile log schema
const createFiles = joi.object({
  filePath: joi.string().max(255).required(),
  fileCreateBy: joi.number().max(99999999).min(1),
  fileUpdateBy: joi.number().max(99999999).min(1),
});

const creteCompileLogSchema = joi.object({
  compilelogTaskId: joi.number().max(8).min(1),
  compilelogScore: joi.number().max(4).min(1),
  compilelogSubmitNo: joi.number().max(2).min(1),
  compilelogTestResult: joi.string().max(10),
  compilelogErrorMessage: joi.string().max(255),
  compilelogCompileStatus: joi.string().max(255),
  compileloglanguage: joi.string().max(255).min(1),
  compilelogFileId: joi.number().max(8).min(1),
  compilelogCreateBy: joi.number().max(8).min(1),
  compilelogUpdateBy: joi.number().max(8).min(1),
});

// create problem schema
const createProblemSchema = joi.object({
  problemTitle: joi.string().max(255).required(),
  // problemPath: joi.string().max(255).required(),
  problemDiscription: joi.string().max(255).required(),
  problemCreateBy: joi.number().max(8).min(1).required(),
  problemUpdateBy: joi.number().max(8).min(1).required(),
});

// create picture schema
const createPicturesScheme = joi.object({
  pictureFileId: joi.number().max(8).min(1).required(),
  pictureProblemId: joi.number().max(8).min(1).required(),
  pictureCreateBy: joi.number().max(8).min(1).required(),
  pictureUpdateBy: joi.number().max(8).min(1).required(),
});

// create hashtag schema
const createHashtagSchema = joi.object({
  hashtagTagId: joi.number().max(8).min(1).required(),
  hashtagProblemId: joi.number().max(8).min(1).required(),
  hashtagCreateBy: joi.number().max(8).min(1).required(),
  hashtagUpdateBy: joi.number().max(8).min(1).required(),
});

// create Testsets schema
const createTestsetsSchema = joi.object({
  testsetTitle: joi.string().max(255).min(1).required(),
  testsetDescription: joi.string().max(255).required(),
  testsetInput: joi.string().max(8).min(1).required(),
  testsetOutput: joi.string().max(8).min(1).required(),
  testsetProblemId: joi.number().max(8).min(1).required(),
  testsetIsExample: joi.number().max(8).min(1).required(),
  testsetCreateBy: joi.number().max(8).min(1).required(),
  testsetUpdateBy: joi.number().max(8).min(1).required(),
});

const updateProblemConditionSchema = joi.object({
  problemId: joi.number().integer().max(99999999),
});

const updateProblemSchema = joi.object({
  problemTitle: joi.string().max(255),
  problemUpdateBy: joi.number().max(99999999).min(1),
  problemUpdateDate: joi.date().raw(),
  problemStatus: joi.number().integer().max(3),
});

module.exports = {
  authSchema,
  userSchema,
  updateUserSchema,
  updateUserConditionSchema,
  createTagSchema,
  getTagSchema,
  updateTagConditionSchema,
  updateTagSchema,
  createAssessSchema,
  getProblemSchema,
  getAssignmentSchema,
  createFiles,
  creteCompileLogSchema,
  createProblemSchema,
  createPicturesScheme,
  createHashtagSchema,
  createTestsetsSchema,
  updateProblemConditionSchema,
  updateProblemSchema
};
