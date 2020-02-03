const Joi = require('joi')
const Validator = require('../../common/utils/Validator')

const mandatoryBlogPostId = Joi.string().required()
const mandatoryBlogPostFields = Joi.object({
  title: Joi.string().required().min(10),
  body: Joi.string().required(),
})

const BlogPostValidator = {
  validateBlogPostId: (id) => Validator.validate(id, mandatoryBlogPostId),
  validateBlogPostFields: (data) =>   Validator.validate(data, mandatoryBlogPostFields),
  validateBlogPostUpdate: ({ id, ...data }) => {
    Validator.validate(id, mandatoryBlogPostId)
    Validator.validate(data, mandatoryBlogPostFields)
  },
}
module.exports = BlogPostValidator
