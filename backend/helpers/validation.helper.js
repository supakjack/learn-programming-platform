const joi = require("@hapi/joi");

const authSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required(),
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

// get problem schema
// const getProblemSchema = joi.object({
//   problemId: joi.number().max(99999999).min(1).required(),
//   tasksProblemId: joi.number().max(99999999).min(1),
//   problemTitle: joi.string().max(255),
//   problemCreateDate: joi.number().max(99999999).min(1),
//   problemStatus: joi.number().integer().max(3),
//   taskScore: joi.number().max(10).min(1).required()
// })

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

module.exports = {
  authSchema,
  createTagSchema,
  getTagSchema,
  updateTagConditionSchema,
  updateTagSchema,
  createAssessSchema,
  getProblemSchema,
  getAssignmentSchema,
  createFiles,
  creteCompileLogSchema,
};
