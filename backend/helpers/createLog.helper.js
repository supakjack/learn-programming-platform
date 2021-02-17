module.exports = {
  // function name: create
  // description: create compile log
  // input:compilelogTaskId, compilelogSubmitNo, compilelogTestResult, compilelogErrorMessage,compilelogCompileStatus, compileloglanguage, compilelogFileId, compilelogCreateBy,compilelogUpdateBy
  // output: text response
  // CreateBy: Theo Seathan / CreateDate: 6/2/2021
  // UpdateBy: Niphitphon Thanatkulkit / UpdateDate: 18/2/2021
  create: async (
    compilelogTaskId,
    compilelogSubmitNo,
    compilelogTestResult,
    compilelogErrorMessage,
    compilelogCompileStatus,
    compileloglanguage,
    compilelogFileId,
    compilelogCreateBy,
    compilelogUpdateBy
  ) => {
    const createCompileLogData = [];
    createCompileLogData.compilelogTaskId = compilelogTaskId;
    createCompileLogData.compilelogSubmitNo = compilelogSubmitNo;
    createCompileLogData.compilelogTestResult = compilelogTestResult;
    createCompileLogData.compilelogErrorMessage = compilelogErrorMessage;
    createCompileLogData.compilelogCompileStatus = compilelogCompileStatus;
    createCompileLogData.compileloglanguage = compileloglanguage;
    createCompileLogData.compilelogFileId = compilelogFileId;
    createCompileLogData.compilelogCreateBy = compilelogCreateBy;
    createCompileLogData.compilelogUpdateBy = compilelogUpdateBy;
    
    // try call function createTag in global model then catch if error
    return (doesCreate = await globalModel.insert({
      name: "compilelogs",
      insertData: [createCompileLogData],
    }));
  },
};
