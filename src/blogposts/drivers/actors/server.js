const App = require('../../../common/setup/App')
const Logger = require('../../../common/utils/Logger')
const createBlogPostRouter = require('./BlogPostRouter')
const dependencies = require('./CompositionRoot')

// create app
const app = App(createBlogPostRouter(dependencies))
app.listen(3000, () => {
  Logger.info('App listining on port 3000', { tags: 'init' })
})
