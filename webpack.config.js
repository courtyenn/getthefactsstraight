var path = require('path');
module.exports = {
  entry: {
    "./public/game": "./src/game/index",
    "./public/creation": "./src/creation/index"
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
          presets: ['react', 'babel-preset-env']
        },
        env: {
          "test": {
            "plugins": ["transform-es2015-modules-commonjs"]
          }
        }
      }
    ]
  }
};
