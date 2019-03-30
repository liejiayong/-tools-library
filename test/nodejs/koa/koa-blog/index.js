const path = require('path')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const views = require('koa-views')
const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const { database, SERVER_PORT } = require('./config/default.js')

const Koa = require('koa')
const app = new Koa()

// session 存储配置
const sessionMysqlConfig = {
  user: database.USERNAME,
  password: database.PASSWORD,
  database: database.DATABASE,
  host: database.HOST
}

// 配置session中间件
app.use(
  session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
  })
)

// 配置静态资源加载中间件
// app.use(koaStatic(
//   path.join(__dirname , './public')
// ))

// 缓存
app.use(staticCache(path.join(__dirname, '/public'), { dynamic: true }, { maxAge: 365 * 24 * 60 * 60 }))

app.use(staticCache(path.join(__dirname, '/images'), { dynamic: true }, { maxAge: 365 * 24 * 60 * 60 }))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }))
app.use(bodyParser({ formLimit: '1mb' }))

// 路由
app.use(require('./routers/signup.js').routes())
app.use(require('./routers/signin.js').routes())
app.use(require('./routers/posts.js').routes())
app.use(require('./routers/create.js').routes())

app.listen(SERVER_PORT)

console.log(`listening on port ${SERVER_PORT}`)
