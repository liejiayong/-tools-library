const proxy = require("http-proxy-middleware")

// 默认代理为"proxy",自定义代理必须以"/api"开头(可在/src/utils/axios.js中修改)
module.exports = function (app) {
  app.use(
    proxy("/proxy", {
      target: "http://www.my-dev-server.com",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy": ""
      }
    }),
    proxy("/api-a", {
      target: "http://www.the-other-server.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api-a": ""
      }
    })
  )
}
