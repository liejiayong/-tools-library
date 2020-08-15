const router = require('koa-router')()
const post = require('./post.controller')

router.get('/getPostList', post.getPostList)
router.get('/getPost/:id', post.getPost)
router.get('/add', post.addPost)

module.exports = router