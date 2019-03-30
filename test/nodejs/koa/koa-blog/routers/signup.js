const router = require('koa-router')()
const { getSignup, postSignup } = require('../controller/c-signup')

// 注册页面
router.get('/signup', getSignup)
// post 注册
router.post('/signup', postSignup)

module.exports = router
