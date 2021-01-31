const createError = require('http-errors')
const { c, cpp } = require('compile-run')

module.exports = {
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
