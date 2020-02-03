
const createBlogPostController = ({ service }) => ({
    getBlogPost: ({ data: { id }}) => service.getBlogPost(id),
    createBlogPost: ({ data }) => service.createBlogPost(data),
    updateBlogPost: ({ data }) => service.updateBlogPost(data),
    deleteBlogPost: async ({ data: { id }}) => {
      await service.deleteBlogPost(id)
      return { status: 204 }
    },
})

module.exports = createBlogPostController
