const webpack = require('webpack');
const path = require('path');
const bourbon = require("node-bourbon").includePaths;

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: {
    'plugin': './src/main.js',
    'docs': './docs/main.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader?includePaths[]=' + bourbon,
            'sass': 'vue-style-loader!css-loader!sass-loader?includePaths[]=' + bourbon
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  performance: {
    hints: false
  }
};
