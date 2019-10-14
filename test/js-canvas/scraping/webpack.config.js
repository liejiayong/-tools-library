const path = require('path');

const  config = {
    entry: {
      CanvasScraping: './canvas-scraping.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
        library: 'CanvasScraping',
        libraryTarget: 'umd'
    }
};

module.exports = config;
