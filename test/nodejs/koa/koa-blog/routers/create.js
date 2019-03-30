const router = require('koa-router')()
const controller = require('../controller/c-create')

router.get('/create', controller.getRedirectCreate)

module.exports = router
