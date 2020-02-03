const Router = require('koa-router')
const { useController } = require('../../../common/setup/ControllerHandler')

const createBlogPostRouter = ({ controller }) => {
  const router = new Router({ prefix: '/api/v1/blogposts' })
  router.get('/:id', (context) => useController(context,  controller.getBlogPost))
  router.post('/', (context) => useController(context, controller.createBlogPost))
  router.put('/:id', (context) => useController(context, controller.updateBlogPost))
  router.delete('/:id', (context) => useController(context, controller.deleteBlogPost))
  return router
}
module.exports = createBlogPostRouter

