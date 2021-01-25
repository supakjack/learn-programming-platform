const joi = require('@hapi/joi')

const authSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required()
})

module.exports = {
  authSchema
}
