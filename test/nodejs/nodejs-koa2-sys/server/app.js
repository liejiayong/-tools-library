const http = require('http')
const fs = require('fs')
const path = require('path')
const session = require('koa-session2')
const app = require('./config/koa')
const config = require('./config/environment')
const mysqlQuery = require('./utils/mysql')

app.use(session({
  store: new session.Store(config.db.redis)
  , ttl: 2 * 60 * 60 * 1000
}))

// 注入mysql query tool
app.use(async (ctx, next) => {
  ctx.exceSql = mysqlQuery
  ctx.set('Access-Control-Allow-Origin', config.accessControlAllowOrigin)
  await next()

  console.log('section', ctx.session)
})

// for test github oauth  api
app.use(async (ctx, next) => {
  if (ctx.URL.pathname == '/index.html') {
    // console.log(ctx.URL)
    // ctx.redirect('/index.html');
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = require('./view-temp/temp-oauth')

  }
  await next()
});
// app.use(function (ctx, next) {
//   ctx.redirect('/404.html');
// });

// app.on('error', (error, ctx) => {
//   console.log('something error ' + JSON.stringify(ctx.onerror));
//   ctx.redirect('/500.httml');
// })

// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
  if (~file.indexOf('.js')) {
    app.use(require(path.join(__dirname, 'routes', file)).routes());
  }
});

const server = http.createServer(app.callback()).listen(config.port).on('listening', function () {
  console.log(`server listening on: ${config.port}`)
})
