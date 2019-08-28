const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: [
            'webpack-hot-middleware/client?noInfo=true&reload=true', // 生产环境的入口建议把这个去掉
            './src/index.js'
        ]
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
