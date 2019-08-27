const { findDataByName } = require('../models/user')

exports.postSignup = async ctx => {
    try {
        let { name, password, repeatpass, avator } = ctx.request.body
        await findDataByName('ljy').then(async res => {
            console.log('res', res)
            ctx.body = res
        })
    } catch {
        ctx.body = {
            code: 0,
            msg: '请输入正确信息'
        }
    }
}