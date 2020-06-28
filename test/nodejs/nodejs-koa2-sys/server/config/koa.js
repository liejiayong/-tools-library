const path = require('path')
const Koa = require('koa')
const koaJson = require('koa-json')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static') // 静态文件可访问目录，如图片、页面
const jwt = require('koa-jwt')
const config = require('./environment')
const tokenError = require('../middleware/tokenError')
// 暂时未实现数据查询
// const adminAccout = require('../util/admin-account');

// // admin账号通过配置写入到数据库中
// if (config.isUpdateAdmin) {
//   adminAccout.saveAdminAccount();
// }

const app = new Koa()

// app.use(tokenError())
app.use(bodyParser({
  enableTypes: ['json', 'form'] // parser will only parse when request type hits enableTypes, support json/form/text/xml, default is ['json', 'form']
  , encoding: 'utf-8' // requested encoding. Default is utf-8 by co-body.
  , formLimit: '56kb' // limit of the urlencoded body. If the body ends up being larger than this limit, a 413 error code is returned. Default is 56kb.
  , jsonLimit: '1mb' // limit of the text body. Default is 1mb.' // limit of the json body. Default is 1mb.
  , textLimit: '1mb' // limit of the text body. Default is 1mb.
  , xmlLimit: '1mb' // limit of the xml body. Default is 1mb.
  , strict: true // when set to true, JSON parser will only accept arrays and objects. Default is true
  , detectJSON: null // custom json request detect function. Default is null.
  , extendTypes: {
    // json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  } // support extend types:
  , onerror: function (err, ctx) {
    ctx.throw(err, 'body parse error test', 422);
  } // support custom error handle,
  /**
    disableBodyParser: you can dynamic disable body parser by set ctx.disableBodyParser = true.
    app.use(async (ctx, next) => {
      if (ctx.path === '/disable') ctx.disableBodyParser = true;
      await next();
    });
    app.use(bodyparser());
   */
}))
app.use(koaJson())
console.log(config.root, config.appPath, '111111')
app.use(koaStatic(path.join(config.root, config.appPath), {
  maxage: 0 // Browser cache max-age in milliseconds. defaults to 0
  , hidden: false // Allow transfer of hidden files. defaults to false
  , index: 'index.html' // Default file name, defaults to 'index.html'
  , defer: false // If true, serves after return next(), allowing any downstream middleware to respond first.
  , gzip: true // Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
  , br: true // Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists(note, that brotli is only accepted over https).defaults to true.
  , setHeaders: null // Function to set custom headers on response.
  , extensions: false // Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
}))
// app.use(jwt({
//   secret: config.tokenSecret
// }).unless({
//   path: [/^\/backapi\/admin\/login/, /^\/blogapi\//, /^\/blogapi\/oauth\//]
// }))

module.exports = app
