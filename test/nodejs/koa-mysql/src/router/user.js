const router = require('koa-router')() /*引入是实例化路由** 推荐*/
const { postUserInfo } = require('../controls/user')

router.post('/user/info', postUserInfo)
router.get('/user/info', postUserInfo)

module.exports = router
