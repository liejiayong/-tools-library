const router = require('koa-router')()
const oauth = require('../api/oauth/index')

router.get('/', async (ctx, next) => {
  ctx.body = ctx
  await next()
}).routes()

router.use('/blogapi/oauth', oauth.routes(), oauth.allowedMethods())

module.exports = router
