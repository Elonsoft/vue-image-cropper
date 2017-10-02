const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: "3000",
    host: "0.0.0.0"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
});
