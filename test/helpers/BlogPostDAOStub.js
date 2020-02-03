
const BlogPostDAOStub = {
  getBlogPost: async (id) => null,
  createBlogPost: async (blogPost) => blogPost,
  updateBlogPost: async (id, blogPost) => ({ ...blogPost, id: id }),
  deleteBlogPost: async (id) => true,
}
module.exports = BlogPostDAOStub
