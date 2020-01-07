/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libs = [
    'axios',
    'jquery',
    'react-gemini-scrollbar',
    'react-redux',
    'redux'
];

module.exports = {
  mode: 'production',
  entry: {
    app: [
      'babel-polyfill',
      'eventsource-polyfill',
      './src/client/webpack-public-path',
      './src/client/index.js'
    ],
    vendor: libs
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/react-starter/',
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [ 'array-includes', "es6-promise", ['transform-runtime', { "polyfill": false }], 'transform-object-rest-spread', 'transform-decorators-legacy', 'transform-class-properties' ],
          presets: [ 'env', 'react', 'stage-0'] //dealing with IE11 compatibility is the worst. It broke our imports, so: https://github.com/webpack/webpack/issues/4961
        }
      },
      {
        test: require.resolve('jquery'),
        use: [
          { loader: 'expose-loader', options: 'jQuery' },
          { loader: 'expose-loader', options: '$' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          { loader: 'url-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'jquery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/client/img/favicon.ico',
      template: './src/client/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/client/webfonts', to: 'webfonts' },
      { from: 'src/client/img', to: 'img' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ]
};