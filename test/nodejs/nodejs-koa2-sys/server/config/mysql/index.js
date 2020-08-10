const { user, certification } = require('./user')
const { articles, comment, tag, postTag, articlesDraft } = require('./articles')

module.exports = async function (createTable) {
    // 用户中心
    await createTable(user)
    // 实名认证
    await createTable(certification)
    // 文章
    await createTable(articles)
    // 评论
    await createTable(comment)
    // 标签
    await createTable(tag)
    // 文章标签
    await createTable(postTag)
    // 文章草稿
    await createTable(articlesDraft)
}
