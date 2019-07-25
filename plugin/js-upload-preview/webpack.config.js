const path = require('path')

const config = {
  entry: {
    preview: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    library: 'preview',
    libraryTarget: 'umd'
  }
}

module.exports = config
