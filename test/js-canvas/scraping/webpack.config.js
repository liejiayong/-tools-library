const path = require('path');

const  config = {
    entry: {
      scraping: './dist/canvas-scraping.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build'),
        library: 'CanvasScraping',
        libraryTarget: 'umd'
        // libraryTarget: 'window'
    }
};

module.exports = config;
