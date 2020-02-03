const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const { handleError } = require('./ControllerHandler')

const App = (router) => {
  const app = new Koa()
  app.use(cors())
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'" ],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"],
        upgradeInsecureRequests: true,
        blockAllMixedContent: true,
      },
    }),
  )
  app.use(helmet.hsts({ maxAge: 31536000 }))
  app.use(helmet.frameguard({ action: 'deny' }))

  app.use(async (context, next) => next().catch((err) => handleError(err, context)))
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}
module.exports = App
