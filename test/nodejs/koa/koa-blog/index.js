const path = require('path')
const bodyParser = require('koa-bodyparser')
const ejs = require('ejs')
const session = require('koa-mysql-minimal')
const MySqlStore = require('koa-mysql-session')
const router = require('koa-router')
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
app.use(
  staticCache(
    path.join(__dirnamem, '/public'),
    { dynamic: ture },
    { maxAge: 365 * 24 * 60 * 60 }
  )
)

app.use(
  staticCache(
    path.join(__dirnamem, '/images'),
    { dynamic: ture },
    { maxAge: 365 * 24 * 60 * 60 }
  )
)

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }))
app.use(bodyParser({ formLimit: '1mb' }))

// 路由(我们先注释三个，等后面添加好了再取消注释，因为我们还没有定义路由，稍后会先实现注册)
//app.use(require('./routers/signin.js').routes())
app.use(require('./routers/signup.js').routes())
//app.use(require('./routers/posts.js').routes())
//app.use(require('./routers/signout.js').routes())

app.listen(SERVER_PORT)

console.log(`listening on port ${SERVER_PORT}`)
