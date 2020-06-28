const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = ctx
  await next()
}).routes()



module.exports = router
