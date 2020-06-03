const { getSession, sidPrefix } = require("../models/session")

exports.authentication = async function authentication(ctx) {
  let url = ctx.request.url;
  // 登录 不用检查
  if (url == "/auth/login") {
    return true;
  }

  // 验证token
  let tokenId = ctx.request.headers["token"];

  // 判断token存在
  if (!tokenId) {
    ctx.body = {
      status: 50013,
      message: 'token 不能为空'
    }
    return true
  }

  tokenId = `${sidPrefix}:${tokenId}`
  getSession(tokenId).then(async (res) => {
    console.log(ctx.request.headers, 'getSession', res)

    if (res && res.length) {
      const { expires } = res[0]
      // 未过期
      if (expires - Date.now() > 0) {
        await true;
      }
      //过期
      else {
        console.log('expires1', expires)
        ctx.body = {
          status: 50014,
          message: 'token 已过期'
        };
      }
    } else {
      console.log(3)
      ctx.body = {
        status: 50001,
        message: '用户不存在'
      }
      return false
    }

  })
}
