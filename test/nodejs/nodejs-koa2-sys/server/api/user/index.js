const router = require('koa-router')()
const auth = require('./auth.controller')

router.post('/auth/login', auth.login)
router.post('/auth/registry', auth.registry)
router.post('/auth/logout', auth.logout)

module.exports = router
