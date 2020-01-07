// Checkout Slingshot

// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
// import browserSync from 'browser-sync';
// // Required for react-router browserHistory
// // see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
// import historyApiFallback from 'connect-history-api-fallback';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import config from '../webpack.config.js';


// Require Browsersync along with webpack and middleware for it
const browserSync = require('browser-sync');
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require( 'webpack');
const webpackDevMiddleware = require( 'webpack-dev-middleware');
const webpackHotMiddleware = require( 'webpack-hot-middleware');
const config = require( '../webpack.config.js');

const bundler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
exports.run = browserSync({
  port: 3500,
  proxy: {
    target: 'localhost:3001',
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false,
        },
        writeToDisk: true
      }),
      webpackHotMiddleware(bundler),
    ],
  },
  files: [
    'src/client/**/*.html',
  ],
});
