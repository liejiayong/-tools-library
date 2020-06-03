const { user, certification } = require('./user')

module.exports = function (createTable) {
    // 用户中心
    createTable(user)
    // 实名认证
    createTable(certification)
}
