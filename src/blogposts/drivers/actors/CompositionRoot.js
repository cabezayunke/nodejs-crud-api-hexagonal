const DatabaseConnection = require('../../../common/setup/DatabaseConnection')
const BlogPostDAO = require('../../driven/actors/BlogPostDAO')
const BlogPostCache = require('../../driven/actors/BlogPostCache')
const BlogPostValidator = require('../../business/BlogPostValidator')
const createBlogPostRepository = require('../../driven/adapters/BlogPostRepository')
const createBlogPostService = require('../../business/BlogPostService')
const createBlogPostController = require('../../drivers/adapters/BlogPostController')

// db connection
const db = DatabaseConnection.create(require('../../../../config/database'))

// dependencies
const repository = createBlogPostRepository({
  dao: BlogPostDAO,
  cache: BlogPostCache,
})
const service = createBlogPostService({
  repository,
  validator: BlogPostValidator,
})
const controller = createBlogPostController({
  service,
})

module.exports = {
  controller,
  db,
}
