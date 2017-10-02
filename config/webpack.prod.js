const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].js',
    library: projectName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('style.css')
  ]
});
