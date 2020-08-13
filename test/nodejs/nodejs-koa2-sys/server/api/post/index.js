const router = require('koa-router')()
const post = require('./post.controller')

router.get('/getPostList', post.getPostList)
router.get('/getPost/:id', post.getPost)

module.exports = router
