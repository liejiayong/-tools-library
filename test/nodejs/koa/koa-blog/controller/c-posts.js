const moment = require('moment')
const md = require('markdown-it')()
const userModel = require('../lib/controls.js')
const { checkNotLogin, checkLogin } = require('../middlewares/check.js')

/**
 * 重置到文章页
 */
exports.getRedirectPosts = async ctx => {
  ctx.redirect('/posts')
}
/**
 * 文章页
 */
exports.getPosts = async ctx => {
  let res,
    postCount,
    name = decodeURIComponent(ctx.request.querystring.split('=')[1])
  if (ctx.request.querystring) {
    await userModel.findPostCountByName(name).then(result => {
      postCount = result[0].count
    })
    await userModel.findPostByUserPage(name, 1).then(result => {
      res = result
    })
    await ctx.render('selfPosts', {
      session: ctx.session,
      posts: res,
      postsPageLength: Math.ceil(postCount / 10)
    })
  } else {
    await userModel.findPostByPage(1).then(result => {
      res = result
    })
    await userModel.findAllPostCount().then(result => {
      postCount = result[0].count
    })
    await ctx.render('posts', {
      session: ctx.session,
      posts: res,
      postsLength: postCount,
      postsPageLength: Math.ceil(postCount / 10)
    })
  }
}

/**
 * 首页分页， 每次输出10条
 */
exports.postPostsPage = async ctx => {
  let page = ctx.request.body.page
  await userModel
    .findPostByPage(page)
    .then(result => {
      ctx.body = result
    })
    .catch(() => {
      ctx.body = 'error'
    })
}
