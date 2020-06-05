const { user, certification } = require('./user')
const { articles } = require('./articles')

module.exports = function (createTable) {
    // 用户中心
    createTable(user)
    // 实名认证
    createTable(certification)
    // 文章
    createTable(articles)
}
