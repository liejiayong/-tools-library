const http = require('http')
const Koa = require('koa')
const { HTTP_SERVER_PORT } = require('./config/default')

const app = new Koa()
http.createServer(app.callback()).listen(HTTP_SERVER_PORT)
console.log(`http server listening on port ${HTTP_SERVER_PORT}`)
