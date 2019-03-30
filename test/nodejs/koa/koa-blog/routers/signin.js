const router = require('koa-router')()
const { getSignin, postSignin } = require('../controller/c-signin')

router.get('/signin', getSignin)
router.post('/signin', postSignin)

module.exports = router
