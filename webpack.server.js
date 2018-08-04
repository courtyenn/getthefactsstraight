const path = require('path')

module.exports = {
    target: 'node',
    entry: ['babel-polyfill', './server/server.js'],
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', ['env', { targets: { browsers: ["last 2 versions"] } }]]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}