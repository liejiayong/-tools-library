const http = require('http')
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const router = require('./router')
const authentication = require('./middlewares/authentication')
const { HTTP_SERVER_PORT, database } = require('./config/default')
const staticPath = '/cachefile'

const app = new Koa()

// 配置静态资源加载
// app.use(koaStatic(path.join(__dirname, staticPath)))
app.use(staticCache(path.join(__dirname, staticPath), { dynamic: true }, { maxAge: 365 * 24 * 60 * 60 }))

// 配置服务器路由请求
app.use(bodyParser({ formLimit: '1mb' }))

// session
app.use(
    session({
        key: 'USER_SID',
        store: new MysqlStore({
            user: database.USERNAME,
            password: database.PASSWORD,
            database: database.DATABASE,
            host: database.HOST
        })
    })
)

// 权鉴
app.use(authentication)

// 路由
router(app)

// 创建服务
const server = http.createServer(app.callback())

// socket.io
require('./lib/socketIO')(server)

// 监听端口
server.listen(HTTP_SERVER_PORT)
console.log(`http server listening on port ${HTTP_SERVER_PORT}`)
