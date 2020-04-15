const app = require('koa')
const { findDataByUId } = require('../models/user')
const { authentication } = require('../middlewares/authentication')
console.log('aut', authentication, typeof authentication)
exports.postUserInfo = async ctx => {
    await authentication(ctx)// 权鉴

    try {
        let { id } = ctx.request.body
        await findDataByUId(id).then(res => {
            if (res.length) {
                ctx.body = {
                    code: 1,
                    message: '获取用户信息操作成功',
                    data: res[0]
                }
                console.log('获取用户信息操作成功', ctx.session)
            } else {
                ctx.body = {
                    code: 20001,
                    msg: '用户名不存在'
                }
                console.log('用户名不存在!')
            }
        })
    } catch { }
}

exports.getUserInfo = async ctx => {
    app.use(require('./middlewares/authentication'))// 权鉴

    try {
        let { id } = ctx.query
        await findDataByUId(id).then(res => {
            if (res.length) {
                ctx.body = {
                    code: 1,
                    message: '获取用户信息操作成功',
                    data: res[0]
                }
                console.log('获取用户信息操作成功', ctx.session)
            } else {
                ctx.body = {
                    code: 20001,
                    msg: '用户名不存在'
                }
                console.log('用户名不存在!')
            }
        })
    } catch { }
}
