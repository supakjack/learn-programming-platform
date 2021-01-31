const createError = require('http-errors')
const { comileLogic } = require('./../helpers/compile.helper')

module.exports = {
  // function name: run
  // description: run compile by API
  // input: language, source, path, stdin
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  run: async (req, res, next) => {
    const compile = req.query.compile,
      language = req.query.language,
      source = req.body.source,
      path = req.body.path,
      stdin = req.body.stdin
    try {
      const doesCompile = await comileLogic(
        language,
        compile,
        stdin,
        source,
        path
      )

      res.status(200).send(doesCompile)
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError())
      next(error)
    }
  }
}
