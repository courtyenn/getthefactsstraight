var path = require('path');
module.exports = {
  entry: {
    "./dist/index": "./src/index"
  },
  module: {
    debug: true,
    devtool: "source-map",
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: path.resolve(__dirname, 'src'),
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
  }
};
