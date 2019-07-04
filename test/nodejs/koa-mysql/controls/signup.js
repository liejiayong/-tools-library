const { query } = require('../lib/mysql')

exports.getSignup = async ctx => {
    console.log(ctx)
    ctx.body = ctx
}