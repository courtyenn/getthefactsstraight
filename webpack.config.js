var path = require('path');
module.exports = {
  entry: {
    "./dist/index": "./src/index"
  },
  output: {
    filename: '[name].js',
    targetLibrary: 'umd'
  },
  debug: true,
  devtool: "source-map",
  module: {
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
  }
};
