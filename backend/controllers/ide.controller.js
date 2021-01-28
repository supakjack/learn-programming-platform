const createError = require('http-errors')
const { c, cpp } = require('compile-run')

module.exports = {
  // function name: run
  // description: run compile by API
  // input: language, source, path, stdin
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  run: async (req, res, next) => {
    const compile = req.query.compile
    const language = req.query.language
    try {
      if (language == 'cpp') {
        const doesCompile =
          compile == 'source'
            ? cpp.runSource(req.body.source, { stdin: req.body.stdin })
            : compile == 'path'
            ? cpp.runFile(req.body.path, { stdin: req.body.stdin })
            : null
        doesCompile
          .then((result) => {
            res.status(200).send(result)
          })
          .catch((err) => {
            throw err
          })
      } else if (language == 'c') {
        const doesCompile =
          compile == 'source'
            ? c.runSource(req.body.source, { stdin: req.body.stdin })
            : compile == 'path'
            ? c.runFile(req.body.path, { stdin: req.body.stdin })
            : null
        doesCompile
          .then((result) => {
            res.status(200).send(result)
          })
          .catch((err) => {
            throw err
          })
      }
    } catch (error) {
      if (error.isJoi === true) return next(createError.InternalServerError())
      next(error)
    }
  }
}
