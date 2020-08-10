const router = require('koa-router')()
const oauth = require('../api/oauth/index')
const user = require('../api/user')

router.get('/', async (ctx, next) => {
  ctx.body = ctx
  await next()
}).routes()

router.use('/blogapi/oauth', oauth.routes(), oauth.allowedMethods())
router.use('/blogapi/user', user.routes(), user.allowedMethods())

module.exports = router
