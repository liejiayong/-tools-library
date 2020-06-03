const app = require('koa')
const { setCerti } = require('../../models/user')

exports.postCertification = async ctx => {
  try {
      let { type } = ctx.query
      console.log('postCertification', type)
      console.table(ctx.query)
      await setCerti(type).then(res => {
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
      })
  } catch  {

  }
}
