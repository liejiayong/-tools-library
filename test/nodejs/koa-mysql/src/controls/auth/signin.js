const app = require('koa')
const { findDataByName } = require('../../models/user')
const { authentication } = require('../../middlewares/authentication')

exports.postSignin = async ctx => {
    await authentication(ctx)// 权鉴

    let { name, password } = ctx.request.body
    console.log('signin', name, password)
    await findDataByName(name).then(res => {
        if (res.length && res[0]['name'] && res[0]['pass'] === password) {
            // ctx.session = {
            //     user: res[0]['name'],
            //     uid: res[0]['id']
            // }
            ctx.body = {
                code: 0,
                message: '登录成功',
                data: res[0]
            }
            console.log('登录成功', ctx.session)
        } else {
            ctx.body = {
                code: 20001,
                msg: '用户名或密码错误'
            }
            console.log('用户名或密码错误!')
        }
    })
}