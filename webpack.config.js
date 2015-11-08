module.exports = {
    entry: "./src/index",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loaders: ["babel-loader"]
            },
            {
               test: /\.json$/,
               loaders:["json-loader"]
            }
        ]
    }
};
