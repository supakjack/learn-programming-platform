const createError = require('http-errors')
const { c, cpp } = require('compile-run')

module.exports = {
  // function name: comileLogic
  // description: compile by parameter
  // input: language, compile, stdin, source, path
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  comileLogic: async (language, compile, stdin, source, path) => {
    return compile == 'source'
      ? language == 'cpp'
        ? await cpp.runSource(source, { stdin })
        : language == 'c'
        ? await c.runSource(source, { stdin })
        : createError.UnprocessableEntity('not found language')
      : compile == 'path'
      ? language == 'cpp'
        ? await cpp.runFile(path, { stdin })
        : language == 'c'
        ? await c.runFile(path, { stdin })
        : createError.UnprocessableEntity('not found language')
      : createError.UnprocessableEntity('not found compile')
  }
}
