const router = require('koa-router')()

router.use('/', router.get('/index', (ctx) => {
  console.log(ctx)
}).routes())
