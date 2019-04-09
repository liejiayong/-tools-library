const Koa = require('koa')
const router = require('./routers/index')

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('koa listen 3000!')
})
