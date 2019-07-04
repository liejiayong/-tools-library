const http = require('http')
const Koa = require('koa')
const router = require('./router');
const { HTTP_SERVER_PORT } = require('./config/default')

const app = new Koa()



// 路由
router(app)

http.createServer(app.callback()).listen(HTTP_SERVER_PORT)
console.log(`http server listening on port ${HTTP_SERVER_PORT}`)
