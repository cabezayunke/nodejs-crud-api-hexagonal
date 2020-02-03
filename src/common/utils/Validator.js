const Joi = require('joi');
const ApiError = require('./ApiError')

module.exports = {
  validate: (data, schema) => {
    const result = Joi.validate(data, schema)
    if(result.error !== null) {
      throw ApiError.badRequest('ValidationError', { error: result.error.message })
    }
    return true;
  }
}
