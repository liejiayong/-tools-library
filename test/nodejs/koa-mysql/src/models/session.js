const { query } = require('../lib/mysql')

const sidPrefix = 'USER_SID'

exports.sidPrefix = sidPrefix

exports.getSession = (sid) => {
  let _sql = `select * from _mysql_session_store where id="${sid}";`
  return query(_sql)
}
