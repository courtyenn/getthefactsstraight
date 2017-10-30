var path = require('path');
module.exports = {
  entry: {
    "./public/game": ["babel-polyfill", "./src/game/index"],
    "./public/creation": ["babel-polyfill", "./src/creation/index"]
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
          presets: ['react', 'es2015', 'es2017']
        }
      }
    ]
  }
};
