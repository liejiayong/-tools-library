const Koa = require('koa'),
  router = require('koa-router')(),
  websockify = require('koa-websocket');

const wsOptions = {};
const app = websockify(new Koa(), wsOptions);

app.ws.use(router.all('/ws',(ctx) => {
  // the websocket is added to the context as `ctx.websocket`.
  ctx.websocket.on('message', function (message) {
    // print message from the client
    console.log('websocket recv:', JSON.parse(message));
    setTimeout(() => {
      ctx.websocket.send(JSON.stringify(message));
    }, 1000);
  });
}).routes());

app.listen(3000);
console.log(`listen 3000`)
