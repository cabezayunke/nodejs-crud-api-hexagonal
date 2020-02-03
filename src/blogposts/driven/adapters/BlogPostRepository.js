
const findBuilder = ({ dao, cache }) => async (id) => {
  const cachedItem = await cache.find(id)
  if(cachedItem) {
    return cachedItem
  }
  const dbItem = await dao.getBlogPost(id)
  if(dbItem) {
    cache.save(dbItem)
  }
  return dbItem
}
const saveBuilder = ({ dao, cache }) => async (blogPost) => {
  const savedItem = blogPost.id
    ? await dao.updateBlogPost(blogPost)
    : await dao.createBlogPost(blogPost)

  cache.save(savedItem)
  return savedItem
}
const removeBuilder = ({ dao, cache }) => async (id) => {
  cache.remove(id)
  return dao.deleteBlogPost(id)
}
const createBlogPostRepository = (dependencies) => ({
  find: findBuilder(dependencies),
  save: saveBuilder(dependencies),
  remove: removeBuilder(dependencies),
})
module.exports = createBlogPostRepository
