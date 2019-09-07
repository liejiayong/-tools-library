const http = require('http')
const path = require('path')
const Koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
// const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const router = require('./router')
const { HTTP_SERVER_PORT } = require('./config/default')
const staticPath = '/cachefile'

const app = new Koa()

// 配置静态资源加载
// app.use(koaStatic(path.join(__dirname, staticPath)))
app.use(staticCache(path.join(__dirname, staticPath), { dynamic: true }, { maxAge: 365 * 24 * 60 * 60 }))

// 配置服务器路由请求
app.use(bodyParser({ formLimit: '1mb' }))

// session
app.keys = ['some secret hurr']
const SESSION_CONFIG = {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: true /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.use(session(SESSION_CONFIG, app))

// 路由
router(app)

// 创建服务
const server = http.createServer(app.callback())

// socket.io
require('./lib/socketIO')(server)

// 监听端口
server.listen(HTTP_SERVER_PORT)
console.log(`http server listening on port ${HTTP_SERVER_PORT}`)
