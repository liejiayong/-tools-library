const router = require('koa-router')()
const controller = require('../controller/c-posts')

// 重定向到文章页
router.get('/', controller.getRedirectPosts)

// 文章页
router.get('/posts', controller.getPosts)
// 首页分页，每次输出10条
router.post('/posts/page', controller.postPostsPage)

module.exports = router
