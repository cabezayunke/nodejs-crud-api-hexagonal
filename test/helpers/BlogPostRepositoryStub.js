
const BlogPostRepositoryStub = {
  find: async (id) => null,
  save: async (blogPost) => blogPost,
  remove: async (id) => true,
}
module.exports = BlogPostRepositoryStub
