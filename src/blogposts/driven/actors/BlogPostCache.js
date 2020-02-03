const cache = {}

// TODO:
// replace this with actual cache implementation
// and use this as CacheStub in tests
const BlogPostCache = {
  find: async (id) => cache[id],
  save: async (blogPost) => {
    cache[blogPost.id] = blogPost
    return true
  },
  remove: async (blogPost) => {
    cache[blogPost.id] = undefined
    return true
  }
}
module.exports = BlogPostCache
