const mysql = require('mysql')
const { database } = require('../config/default')
const model = require('../models/table/index')

// 创建连接池
const pool = mysql.createPool({
    host: database.HOST,
    port: database.PORT,
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    // ssl: {
    // ca: fs.readFileSync(__dirname + '/mysql-ca.crt')
    // set up your ca correctly to trust the connection
    // rejectUnauthorized: false
    // }
})

// 查询
const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
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
model(createTable)

/**
 * 事件监听
 */
// when a new connection is made within the pool. 
// If you need to set session variables on the connection before it gets used
pool.on('connection', function (connection) {
    console.log('Connection %d connection', connection);
});
// when a connection is acquired from the pool.
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection);
});
// when a callback has been queued to wait for an available connection.
pool.on('enqueue', function (connection) {
    console.log('Waiting for available connection slot', connection);
});
// when a connection is released back to the pool.
pool.on('release', function (connection) {
    console.log('Connection %d released', connection);
});

module.exports = {
    query,
    createTable
}
