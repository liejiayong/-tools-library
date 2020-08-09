const router = require('koa-router')()
const post = require('./post.controller')

router.get('/getPostList', post.getPostList)

module.exports = router
