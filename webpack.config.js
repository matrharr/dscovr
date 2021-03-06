const HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
          {
            presets:['es2015','react']
          }
      },
      {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
      }

    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  node: { fs:'empty',
          net: 'empty',
          tls: 'empty',
          child_process: 'empty'
        },
  plugins: [HTMLWebpackPluginConfig],
  mode: 'development',
};
