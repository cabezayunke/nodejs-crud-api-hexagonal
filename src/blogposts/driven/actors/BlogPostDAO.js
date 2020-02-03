const _omit = require('lodash/fp/omit')
const BlogPostModel = require('./BlogPostModel')

const withId = (obj) => {
  return obj ? _omit(['_id'], {
    ...obj,
    id: obj._id,
  }) : obj
}
const BlogPostDAO = {
  getBlogPost: async (id) => {
    const found = await BlogPostModel.findById(id).lean()
    return withId(found)
  },
  createBlogPost: async (blogPost) => {
    const newModel = new BlogPostModel(blogPost)
    await newModel.save()
    return withId(newModel.toObject())
  },
  updateBlogPost: async ({ id, ...data }) => {
    const updated = await BlogPostModel.findByIdAndUpdate(id, data, { new: true }).lean()
    return withId(updated)
  },
  deleteBlogPost: async (id) => {
    const obj = await BlogPostModel.findById(id)
    if(!obj) {
      return false;
    }
    await BlogPostModel.deleteOne({ _id: id })
    return true
  },
}
module.exports = BlogPostDAO
