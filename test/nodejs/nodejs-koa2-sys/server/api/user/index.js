const router = require('koa-router')()
const auth = require('./auth.controller')

router.post('/auth/login', auth.login)

module.exports = router
