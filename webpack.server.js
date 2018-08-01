const path = require('path')

module.exports = {
    target: 'node',
    entry: ['babel-polyfill', './server/server.js'],
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'build')
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', ['env', {targets: { browsers: ["last 2 versions"]}}]]
                }
            }
        ]
    }
}