const webpack = require('webpack')
const koaWebpack = require('koa-webpack')
const config = require('../../webpack.config')

module.exports = async app => {
  try {
    const compiler = webpack(config)
    const middleware = await koaWebpack({ compiler })
    app.use(middleware)
  } catch (err) {
    console.error('webpack hot complied err:', err)
  }
}
