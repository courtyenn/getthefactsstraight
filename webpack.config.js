var path = require('path');
module.exports = {
  entry: {
    "./build/bundle": "./src/index.js"
  },
  output: {
    filename: '[name].js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["env", {
              "targets": {
                "node": "8.11.3"
              }
            }], 'react']
          }
        }
      }
    ]
  }
};
