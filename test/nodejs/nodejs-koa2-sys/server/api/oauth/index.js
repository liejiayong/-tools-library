const router = require('koa-router')()
const github = require('./github.controller')

router.get('/github/redirect', github.githubOAuth)

module.exports = router
