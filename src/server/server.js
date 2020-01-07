/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';

// This breaks stuff
//process.env.NODE_CONFIG_DIR = "../../config";

const express = require('express'),
      config = require('config'),
      fs = require('fs'),
      path = require('path'),
      logger = require('./utils/logger')(module),
      cluster = require('cluster'),
      cpuCount = require('os').cpus().length,
      bodyParser = require('body-parser'),
      eureka = require('eureka-server-starter'),
      routes = require('./routes'),
      cors = require('cors'),
      port = 9000, //process.env.PORT || config.port,
      pkvMiddleware = require('pkv-express-middleware'),
      tokenPubKey = fs.readFileSync(path.resolve(__dirname, './ssl/df-api-gateway.pub.pem'));

let initAPI = (app) => {
  logger.info('Starting API');
  app.use('/api/user', routes.user);
  app.use('/api/form', routes.form);
  app.use('/api/eureka', routes.eureka);
  app.use('/api/s3', routes.s3);

  app.get('/react-starter*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'));
  })
};

let initMiddleware = (app) => {
  if (process.env.NODE_ENV === 'development') {
    const browserSync = require('browser-sync').create();
    const historyApiFallback = require('connect-history-api-fallback');
    const webpack = require( 'webpack');
    const webpackDevMiddleware = require( 'webpack-dev-middleware');
    const webpackHotMiddleware = require( 'webpack-hot-middleware');
    const config = require( '../../webpack.config.js');

    const bundler = webpack(config);

    const bsConf = {
      port: port + 1,
      open: false,
      online: false,
      logSnippet: false,
      cors: true,
      ui: false,
      proxy: {
        target: 'localhost:' + port,
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
    };
    let bs = browserSync.init(bsConf);
    app.use(require('connect-browser-sync')(bs));
  }

  //FIX THIS BECAUSE STUFF IS NOT SETUP RIGHT LOCALLY?
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  eureka.config.initEureka(config);//in eureka before the JWT parsing
  pkvMiddleware.init(tokenPubKey, eureka.service); //init the pkv middleware and pass along the eureka service

  //app.use(pkvMiddleware.middleware);//activate the async middleware

  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/favicon.ico', express.static(__dirname+'/favicon.ico'));
  app.use('/react-starter/', express.static(__dirname+'/../../dist'));
  app.listen(port, () => {
    logger.info('Listening on port ' + port);
  });
};

let init = () => {
    if (cluster.isMaster && process.env.NODE_ENV !== 'development') {
        logger.info('Master is running...');

        for (var i = 0; i < cpuCount; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker) => {
            logger.info('worker ' + worker.process.pid + ' died');
        });
    } else {
        let app = express();
        initMiddleware(app);
        initAPI(app);
    }
};

if (require.main === module) {
  init();
}

const throwUnauthorized = (res) => {
  res.status(401);
  res.send("Unauthorized");
};

exports.init = init;