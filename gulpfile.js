/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const gulp = require('gulp'),
  gutil = require('gulp-util'),
  nodemon = require('gulp-nodemon'),
  webpack = require('webpack'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint');
var browserSyncConnected = false;
var BROWSER_SYNC_RELOAD_DELAY = 500;
gulp.task('default', [ 'webpack-prod' ]);

// gulp.task('webpack', (callback) => {
//   webpack(
//     require('./webpack.config.js'),
//     (err, stats) => {
//       if (err) throw new gutil.PluginError('webpack', err);
//       gutil.log('[webpack]', stats.toString());
//       callback();
//     });
// });


gulp.task('webpack-prod', (callback) => {
  webpack(
    require('./webpack.config.prod.js'),
    (err, stats) => {
      if(err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString());
      callback();
    });
});

gulp.task('lint', () => {
  gulp.src([ 'src/server/*.js' ])
  .pipe(eslint({
      baseConfig: {
        env: {
          browser: true,
          es6: true,
          node: true,
          jest: true,
        },
        extends: [ 'eslint:recommended', 'plugin:react/recommended', 'plugin:flowtype/recommended', 'airbnb-base' ],
        plugins: [ 'react', 'flowtype', ],
        parserOptions: {
          sourceType: 'module',
          ecmaVersion: 2017,
          ecmaFeatures: {
            jsx: true
          }
        },
        rules: {
          quotes: [ 'error', 'single' ],
          semi: [ 'error', 'always' ],
          'no-console': 'off',
          'flowtype/define-flow-type': 'warn',
          'flowtype/require-valid-file-annotation': 'warn',
          'flowtype/use-flow-type': 'warn',
        }
      }
    }))
    .pipe(eslint.format());
});

gulp.task('dev-server', () => {
  nodemon({
    script: 'src/server/server.js',
    tasks: [ 'lint' ],
    watch: "src/server/",
    ext: 'js html css',
    env: { 'NODE_ENV': 'development' }
  }).on('start', function (m) {
    // to avoid nodemon being started multiple times
    if (!browserSyncConnected) {
      browserSync([].concat('src'),
        {
          proxy: {
            target: "http://localhost:9000/react-starter/",
          },
          port: 9001,
          host: "localhost",
          browser: "firefox",
        }, function () {
          browserSyncConnected = true;
        });
    }
    else {
      browserSync.notify(m, 5000);
    }
  }).on('restart', function onRestart() {
    // reload connected browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

gulp.task('dev', ['dev-server'], () => {
  gulp.watch(['src/server/**/*.js'], ['lint']);
});

gulp.task('notify', function () {
  browserSync.notify('Live reload...');
});
//
// gulp.task('dev', ['lint', 'webpack' ], () => {
//   nodemon({
//     script: 'src/server/server.js',
//     tasks: [ 'webpack' ],
//     ignore: [ 'dist', 'node_modules' ],
//     ext: 'js html css',
//     env: { 'NODE_ENV': 'development' }
//   });
// });
