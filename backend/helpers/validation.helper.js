const joi = require("@hapi/joi");

const authSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required(),
});

const getUsernameSchema = joi.object({
  userUsername: joi.string().max(255),
});
const getUserFromCourseSchema = joi.object({
  userId: joi.number().integer().max(99999999),
  sectionId: joi.number().max(99999999).min(1),
});

// update user schema
const updateUserSchema = joi.object({
  userUsername: joi.any(),
  userPrefixThai: joi.any(),
  userFirstnameThai: joi.any(),
  userLastnameThai: joi.any(),
  userPrefixEnglish: joi.any(),
  userFistnameEnglish: joi.any(),
  userLastnameEnglish: joi.any(),
  userCreateBy: joi.number().integer().max(99999999).min(1),
  userUpdateBy: joi.number().integer().max(99999999).min(1),
  userStatus: joi.any(),
});
// user schema
const userSchema = joi.object({
  userUsername: joi.string().max(255),

  userPrefixThai: joi.string().max(255),
  userFirstnameThai: joi.string().max(255),
  userLastnameThai: joi.string().max(255),

  userPrefixEnglish: joi.string().max(255),
  userFirstnameEnglish: joi.string().max(255),
  userLastnameEnglish: joi.string().max(255),

  userCreateBy: joi.number().integer().max(99999999).min(1),
  userUpdateBy: joi.number().integer().max(99999999).min(1),
  userStatus: joi.number().integer().max(3),
});

const createUserSchema = joi.object({
  userUsername: joi.string(),

  userPrefixThai: joi.string(),
  userFirstnameThai: joi.string(),
  userLastnameThai: joi.string(),

  userPrefixEnglish: joi.string(),
  userFistnameEnglish: joi.string(),
  userLastnameEnglish: joi.string(),

  userCreateBy: joi.number().integer().max(99999999).min(1),
  userUpdateBy: joi.number().integer().max(99999999).min(1),

  userStatus: joi.number().integer().max(3),
});

const FileuserSchema = joi.object({
  userUsername: joi.string().required(),
  userFirstnameThai: joi.string().required(),
  userLastnameThai: joi.string().required(),
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
const getAssignmentchema = joi.object({
  assignmentId: joi.number().max(99999999).min(1),
});

const getScoreUserSchema = joi.object({
  taskAssignmentId: joi.number().max(99999999).min(1),
  compilelogCreateBy: joi.number().max(99999999).min(1),
  taskId: joi.number().max(99999999).min(1),
});
// get problem with tag schema
const getProblemWithTagSchema = joi.object({
  problemId: joi.number().max(99999999).min(1),
  // problemId: joi.number().max(99999999).min(1)
});

// get assignment schema
const getAssignmentSchema = joi.object({
  assignmentSectionId: joi.number().max(99999999).min(1),
  assignmentId: joi.number().max(99999999).min(1),
  assignmentCreateBy: joi.number().integer().max(99999999).min(1),
  assignmentStatus: joi.number().integer().max(3),
});

// create assignment schema
const createAssignmentSchema = joi.object({
  assignmentTitle: joi.string().max(255).required(),
  assignmentDescription: joi.string().max(255).required(),
  assignmentStartDate: joi.date().raw().required(),
  assignmentEndDate: joi.date().raw().required(),
  assignmentStatus: joi.number().integer().max(3).required(),
  assignmentCreateBy: joi.number().integer().max(99999999).min(1).required(),
  assignmentUpdateBy: joi.number().integer().max(99999999).min(1).required(),
});

// update assignment schema
const updateAssignmentSchema = joi.object({
  assignmentTitle: joi.string().max(255),
  assignmentDescription: joi.string().max(255),
  assignmentStartDate: joi.date().raw(),
  assignmentEndDate: joi.date().raw(),
  assignmentUpdateBy: joi.number().max(99999999).min(1),
  assignmentUpdateDate: joi.date().raw(),
  assignmentStatus: joi.number().integer().max(3),
});

// filter update params schema
const updateAssignmentConditionSchema = joi.object({
  assignmentId: joi.number().integer().max(99999999),
});

// get assignment schema
const getTaskAssignmentSchema = joi.object({
  taskAssignmentId: joi.number().max(99999999).min(1),
});

// get assignment schema
const getAssignmentByUserIdSchema = joi.object({
  enrollUserId: joi.number().max(99999999).min(1),
});

// get assignment schema
const getTestsetSchema = joi.object({
  testsetProblemId: joi.number().max(99999999).min(1),
});

// get assignment schema
const getCompilelogSchema = joi.object({
  compilelogTaskId: joi.number().max(99999999).min(1),
  compilelogCreateBy: joi.number().max(99999999).min(1),
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
  problemStatus: joi.number().max(99999999).min(1).required(),
  problemDescription: joi.string().max(255).required(),
  problemCreateBy: joi.number().max(99999999).min(1).required(),
  problemUpdateBy: joi.number().max(99999999).min(1).required(),
});

// create picture schema
const createPicturesScheme = joi.object({
  pictureFileId: joi.number().max(99999999).min(1).required(),
  pictureProblemId: joi.number().max(99999999).min(1).required(),
  pictureCreateBy: joi.number().max(99999999).min(1).required(),
  pictureUpdateBy: joi.number().max(99999999).min(1).required(),
});

// get hashtag schema
const getHashtagSchema = joi.object({
  hashtagTagId: joi.number().max(99999999).min(1),
  hashtagProblemId: joi.number().max(99999999).min(1),
});

// create hashtag schema
const createHashtagSchema = joi.object({
  hashtagTagId: joi.number().max(99999999).min(1).required(),
  hashtagProblemId: joi.number().max(99999999).min(1).required(),
  hashtagCreateBy: joi.number().max(99999999).min(1).required(),
  hashtagUpdateBy: joi.number().max(99999999).min(1).required(),
});

// create Testsets schema
const createTestsetsSchema = joi.object({
  testsetTitle: joi.string().max(255).min(1).required(),
  testsetDescription: joi.string().max(255).required(),
  testsetInput: joi.string().max(99999999).min(1).required(),
  testsetOutput: joi.string().max(99999999).min(1).required(),
  testsetProblemId: joi.number().max(99999999).min(1).required(),
  testsetIsExample: joi.number().max(99999999).min(1).required(),
  testsetCreateBy: joi.number().max(99999999).min(1).required(),
  testsetUpdateBy: joi.number().max(99999999).min(1).required(),
});

const updateProblemConditionSchema = joi.object({
  problemId: joi.number().integer().max(99999999),
});

const updateProblemSchema = joi.object({
  problemTitle: joi.string().max(255),
  problemDescription: joi.string().max(255),
  problemStatus: joi.number().integer().max(3),
  problemUpdateBy: joi.number().max(99999999).min(1),
  problemUpdateDate: joi.date().raw(),
});

// get Course schema
const getCourseSchema = joi.object({
  userId: joi.number().max(99999999).min(1),
});

// get assignment schema
const getUserFromCourseSchema = joi.object({
  userId: joi.number().integer().max(99999999),
  sectionId: joi.number().max(99999999).min(1),
});
const getUserIdSchema = joi.object({
  userId: joi.number().integer().max(99999999),
});

// insertCourse
const insertCourseSchema = joi.object({
  courseCode: joi.string().max(255),
  courseName: joi.string().max(255),
  courseYearId: joi.number().max(99999999).min(1),
  courseCreateBy: joi.number().max(99999999).min(1),
  courseUpdateBy: joi.number().max(99999999).min(1),
  courseStatus: joi.number().integer().max(3),
});

// updateCourse
const updateCourseSchema = joi.object({
  courseId: joi.number().max(99999999).min(1).required(),
  courseCode: joi.string().max(255),
  courseName: joi.string().max(255),
  courseYearId: joi.number().max(99999999).min(1),
  courseCreateBy: joi.number().max(99999999).min(1),
  courseUpdateBy: joi.number().max(99999999).min(1),
  courseStatus: joi.number().integer().max(3),
});

// get year schema
const getYearSchema = joi.object({
  yearId: joi.number().max(99999999).min(1),
  yearCreateBy: joi.number().integer().max(99999999).min(1),
  yearStatus: joi.number().integer().max(3),
});

module.exports = {
  getYearSchema,
  authSchema,
  getUserFromCourseSchema,
  getUsernameSchema,
  createUserSchema,
  FileuserSchema,
  getAssignmentByUserIdSchema,
  userSchema,
  createTagSchema,
  getTagSchema,
  updateTagConditionSchema,
  updateTagSchema,
  createAssessSchema,
  getProblemSchema,
  getAssignmentchema,
  getAssignmentSchema,
  getProblemWithTagSchema,
  createProblemSchema,
  updateProblemConditionSchema,
  updateProblemSchema,
  getTestsetSchema,
  createTestsetsSchema,
  createFiles,
  creteCompileLogSchema,
  createProblemSchema,
  getScoreUserSchema,
  createPicturesScheme,
  getHashtagSchema,
  createHashtagSchema,
  getAssignmentSchema,
  getTaskAssignmentSchema,
  createAssignmentSchema,
  updateAssignmentConditionSchema,
  updateAssignmentSchema,
  getCourseSchema,
  getCompilelogSchema,
  insertCourseSchema,
  updateCourseSchema,
  getUserFromCourseSchema,
  getUserIdSchema
};
