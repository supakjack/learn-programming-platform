const knex = require('./../helpers/init_knex')
const createError = require('http-errors')

module.exports = {
  insert: async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const courseId = knex('courses')
          .insert({
            courseCode: data.courseCode,
            courseName: data.courseName,
            courseYearId: data.courseYearId,
            courseCreateBy: data.courseCreateBy,
            courseUpdateBy: data.courseUpdateBy,
            courseStatus: data.courseStatus
          })
          .then(function (ret) {
            const id = ret[0]
            resolve(id)
          })

        // console.log(id);
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  }
}
