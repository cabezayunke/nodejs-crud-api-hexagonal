const BlogPostModel = require('../../src/blogposts/driven/actors/BlogPostModel')

module.exports = {
  blogPostsUp: async () => {
      const blogPost = new BlogPostModel({
        title: 'example blog post',
        body: 'example blog post body yay!'
      })
      await blogPost.save()
      return {
        blogPost: {
          ...blogPost.toObject(),
          id: blogPost._id
        },
      }
  },
  blogPostsDown: async () => {
    return BlogPostModel.deleteMany({})
  },
}
