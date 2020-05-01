/**
 * @description 配置代理
 */

const proxy = require('http-proxy-middleware')

function createProxy(path = '', target = '') {
  return proxy(path, {
    target,
    changeOrigin: true,
    pathRewrite: { [`^${path}`]: '' },
  })
}

module.exports = function(app) {
  app.use(
    createProxy('/proxy', 'http://www.aaa.com/api'),
    createProxy('/api-abc', 'http://www.bbb.com/api')
  )
}
