const path = require('path');

const config = {
  mode: 'development',
  entry: {
    scraping: './dist/canvas-scraping.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
    library: ['CanvasScraping'],
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    }
  },
  devtool: "source-map"
};

module.exports = config;
