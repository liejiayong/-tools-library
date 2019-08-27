const { query } = require('../lib/mysql')

// 通过名字查找用户
exports.findDataByName = name => {
    let _sql = `select * from users where name="${name}";`
    return query(_sql)
}