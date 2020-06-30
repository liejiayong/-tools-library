const path = require('path')

module.exports = {
  db: {
    mysql: {
      host: '127.0.0.1'
      , user: 'root'
      , password: 'root'
      , database: 'koa_blog'
      , connectionLimit: 10
    }
    , redis: {
      port: 6379
      , host: '127.0.0.1'
      , options: {
        return_buffers: false
        , auth_pass: ''
        , db: 3
      }
    }
  }
  , oAuth: {
    github: {
      client_id: 'f120f3a2d07f69c8188c',
      client_secret: 'a47fc8f0612fe5ef59e6efa7be8d5bf8d212d057'
    }
  }
  , root: path.normalize(__dirname + '/..')
  , appPath: 'static'
  , tempUploads: 'temUploads'
  , uploads: 'uploads'
  , port: 9000
  , tokenSecret: 'test'
  , isUpdateAdmin: true
  , accessControlAllowOrigin: 'http://localhost:3000'
  , adminName: 'admin'
  , adminPassword: '123456'
  , socketioPath: '/testsocketiopath'
  , draftPostRedisKey: 'DRAFTPSOTKEY'
}
