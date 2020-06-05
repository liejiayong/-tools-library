const app = require('koa')
const { certiUser } = require('../../models/user')

exports.postCertification = async ctx => {
    try {
        let { type, username } = ctx.request.body
        console.log(type, username)
        await certiUser([type, username]).then(res => {
            console.log('res', res)
            if (res.length) {
                ctx.body = {
                    code: 1,
                    message: '操作成功',
                    data: res[0]
                }
            } else {
                ctx.body = {
                    code: 20001,
                    msg: '操作失败，请填写xxx'
                }
            }
        }).catch(() => {
            ctx.body = {
                code: 50001,
                msg: '操作失败'
            }
        })
    } catch  {
        ctx.body = {
            code: 50001,
            msg: '操作失败，请填写xxx'
        }
    }
}
