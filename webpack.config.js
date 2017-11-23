var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var clientConfig = {
    entry: {
        "./public/game": ["babel-polyfill", "./src/game/index"],
        "./public/creation": ["babel-polyfill", "./src/creation/index"]
    },
    output: {
        filename: '[name].js'
    },
    devtool: "source-map",
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'build')],
                query: {
                    presets: ['react', 'es2015', 'es2017']
                }
            }
        ]
    },
    // externals: nodeModules
}

var serverConfig = {
    entry: {
        "./server": ["babel-polyfill", "./build/server/server"]
    },
    output: {
        filename: '[name].js'
    },
    devtool: "source-map",
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'build')],
                query: {
                    presets: ['react', 'es2015', 'es2017']
                }
            }
        ]
    },
    externals: nodeModules
}

module.exports = [serverConfig, clientConfig]
