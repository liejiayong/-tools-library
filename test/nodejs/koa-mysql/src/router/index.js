module.exports = function (app) {
    // 注册
    app.use(require('koa-router')().get('/', ctx => {
        ctx.body = 'hello world'
    }).routes())
    app.use(require('./signup').routes())
}