const router = require('koa-router')() /*引入是实例化路由** 推荐*/
const { postSignin } = require('../controls/auth/signin')
const { postSignup } = require('../controls/auth/signup')
const { postCertification } = require('../controls/auth/certification')

// 登录
router.post('/auth/signin', postSignin)
router.get('/auth/signin', postSignin)

// 注册
router.post('/auth/signup', postSignup)
router.get('/auth/signup', postSignup)

// 实名认证
router.post('/auth/certi', postCertification)

module.exports = router
