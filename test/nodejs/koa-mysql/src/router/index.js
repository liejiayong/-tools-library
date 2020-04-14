module.exports = function (app) {
    // 注册
    app.use(require('koa-router')().get('/', ctx => {
        ctx.body = 'hello world'
    }).routes())
    // 登录注册认证检查
    app.use(require('./auth').routes())
    // 用户中心
    app.use(require('./user').routes())
}
