
const invocations = {
  validateBlogPostId: 0,
  validateBlogPostFields: 0,
  validateBlogPostUpdate: 0,
}
const BlogPostValidatorSpy = {
  // stubs
  validateBlogPostId: (id) => {
    invocations.validateBlogPostId++
    return true
  },
  validateBlogPostFields: (data) => {
    invocations.validateBlogPostFields++
    return true
  },
  validateBlogPostUpdate: (data) => {
    invocations.validateBlogPostUpdate++
    return true
  },
  // spy helpers
  hasBeenCalled: (fnName) => invocations[fnName] > 0,
  getFnInvocationCount: (fnName) => invocations[fnName],
  reset: () => {
    invocations.validateBlogPostId = 0
    invocations.validateBlogPostFields = 0
    invocations.validateBlogPostUpdate = 0
  }
}
module.exports = BlogPostValidatorSpy
