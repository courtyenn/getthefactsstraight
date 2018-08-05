const path = require('path')

module.exports = {
    entry: ['babel-polyfill', './src/creation/client.js'],
    output: {
        filename: 'client-bundle.js',
        path: path.resolve(__dirname, 'public')
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
            }
        ]
    }
}