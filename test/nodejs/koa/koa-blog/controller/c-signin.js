const md5 = require('md5')
const { findDataByName } = require('../lib/controls.js')
const { checkNotLogin, checkLogin } = require('../middlewares/check.js')

exports.getSignin = async ctx => {
  await checkNotLogin(ctx)
  await ctx.render('signin', {
    session: ctx.session
  })
}

exports.postSignin = async ctx => {
  console.log(ctx.request.body, 'postSignin')
  let { name, password } = ctx.request.body
  await findDataByName(name)
    .then(result => {
      let res = result
      if (res.length && name === res[0]['name'] && md5(password) === res[0]['pass']) {
        ctx.session = {
          user: res[0]['name'],
          id: res[0]['id']
        }
        ctx.body = {
          code: 200,
          message: '登录成功'
        }
        console.log('ctx.session.id', ctx.session.id)
        console.log('session', ctx.session)
        console.log('登录成功')
      } else {
        ctx.body = {
          code: 500,
          message: '用户名或密码错误'
        }
        console.log('用户名或密码错误!')
      }
    })
    .catch(err => {
      console.log(err)
    })
}
