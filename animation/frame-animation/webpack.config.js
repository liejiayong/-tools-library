const path = require('path');

const  config = {
    entry: {
        animation: './src/frame-animation.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        library: 'animation',
        libraryTarget: 'umd'
    }
};

module.exports = config;