const ApiError = require('../../common/utils/ApiError')

const getBlogPostBuilder = ({ repository, validator }) => async (id) => {
  validator.validateBlogPostId(id)
  // some logic here
  const blogPost = await repository.find(id)
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}
const createBlogPostBuilder = ({ repository, validator }) => async (data) => {
  validator.validateBlogPostFields(data)
  // some logic here
  const blogPost = await repository.save(data)
  if(!blogPost) {
    throw ApiError.internal('Blog post could not be created')
  }
  // more logic here
  return blogPost
}
const updateBlogPostBuilder = ({ repository, validator }) => async (data) => {
  validator.validateBlogPostUpdate(data)
  // some logic here
  const blogPost = await repository.save(data)
  if(!blogPost) {
    throw ApiError.notFound('Blog post not found')
  }
  // more logic here
  return blogPost
}
const deleteBlogPostBuilder = ({ repository, validator }) => async (id) => {
  validator.validateBlogPostId(id)
  const result = await repository.remove(id)
  if(!result) {
    throw ApiError.notFound('Blog post not found')
  }
  return true;
}

const createBlogPostService = (dependencies) => ({
  getBlogPost: getBlogPostBuilder(dependencies),
  createBlogPost: createBlogPostBuilder(dependencies),
  updateBlogPost: updateBlogPostBuilder(dependencies),
  deleteBlogPost: deleteBlogPostBuilder(dependencies),
})
module.exports = createBlogPostService
