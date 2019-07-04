const router = require('koa-router')() /*引入是实例化路由** 推荐*/
const { getSignup } = require('../controls/signup')

router.get('/signin', getSignup)

module.exports = router
