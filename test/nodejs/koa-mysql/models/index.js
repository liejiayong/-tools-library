const { user } = require('../models/user')

module.exports = function (createTable) {
    // 用户中心
    createTable(user)
}