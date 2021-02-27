const createError = require("http-errors");

module.exports = {
  // function name: comileLogic
  // description: compile by parameter
  // input: language, compile, stdin, source, path
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  writeFileLogic: async (sourceCode, singleFile, memefile) => {
    return sourceCode
      ? "main" + "." + memefile
      : singleFile
      ? singleFile.name
      : createError.UnprocessableEntity("not found file name");
  },
};
