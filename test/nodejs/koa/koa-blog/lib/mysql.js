const mysql = require('mysql')
const { database } = require('../config/default.js')
const { users, posts, comments } = require('./tables.js')

const pool = mysql.createPool({
  host: database.HOST,
  user: database.USERNAME,
  password: database.PASSWORD,
  database: database.DATABASE
})

// 查询
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, conn) {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 连接不再使用，返回到连接池
          conn.release()
        })
      }
    })
  })
}

// 创建表fn
const createTable = sql => query(sql, [])

// 建表
createTable(users)
createTable(posts)
createTable(comments)

module.exports = {
  query,
  createTable
}
