const jwt = require('jsonwebtoken')
const util = require('util')
const config = require('../config/environment')
const verify = util.promisify(jwt.verify)

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      // 获取jwt
      const token = ctx.header.authorization
      if (token) {
        try {
          // 解密payload，获取用户名和ID
          const payload = await verify(token.split(' ')[1], config.tokenSecret)
          ctx.user = {
            name: payload.name,
            id: payload.id
          }
          await next()
        } catch (error) {
          console.log('token verify fail: ', error)
        }
      } else {
        ctx.status = 301;
        ctx.body = {
          success: 0,
          message: 'authorization 不能为空'
        };
      }
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          success: 0,
          message: '认证失败'
        };
      } else {
        err.status = 404;
        ctx.body = {
          success: 0,
          message: '404'
        };
      }
    }
  }
}
