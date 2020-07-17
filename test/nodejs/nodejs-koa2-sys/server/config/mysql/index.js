const { user, certification } = require('./user')
const { articles, comment } = require('./articles')

module.exports = async function (createTable) {
    // 用户中心
    await createTable(user)
    // 实名认证
    await createTable(certification)
    // 文章
    await createTable(articles)
    // 评论
    await createTable(comment)
}
