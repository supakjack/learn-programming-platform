const createError = require('http-errors')
const { c, cpp, node, python, java } = require('compile-run')

module.exports = {
  // function name: run
  // description: run compile by API
  // input: language, source, path, stdin
  // output: text response
  // CreateBy: Supak Pukdam / CreateDate: 26/1/2021
  // UpdateBy: Supak Pukdam / UpdateDate: 26/1/2021
  run: async (req, res, next) => {
    if (req.query.language == 'c') {
      try {
        const compile =
          req.query.compile == 'source'
            ? cpp.runSource(req.body.source, { stdin: req.body.stdin })
            : cpp.runFile(req.body.path, { stdin: req.body.stdin })
        compile
          .then((result) => {
            res.send(result)
          })
          .catch((err) => {
            console.log(err)
          })
        res.status(200).send({ doseCompile })
      } catch (error) {
        if (error.isJoi === true) return next(createError.InternalServerError())
        next(error)
      }
    }
  }
}
