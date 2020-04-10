const router = require('koa-router')() /*引入是实例化路由** 推荐*/
const { postSignin } = require('../controls/signin')

router.post('/signin', postSignin)
router.get('/signin', postSignin)

module.exports = router
