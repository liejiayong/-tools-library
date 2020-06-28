const http = require('http')
const fs = require('fs')
const path = require('path')
const app = require('./config/koa')
const config = require('./config/environment')

// app.use(function (ctx, next) {
//   ctx.redirect('/404.html');
// });

// app.on('error', (error, ctx) => {
//   console.log('something error ' + JSON.stringify(ctx.onerror));
//   ctx.redirect('/500.httml');
// })

// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
  console.log('route setup', file)
  if (~file.indexOf('.js')) {
    app.use(require(path.join(__dirname, 'routes', file)).routes());
  }
});

const server = http.createServer(app.callback()).listen(config.port).on('listening', function () {
  console.log(`server listening on: ${config.port}`)
})
