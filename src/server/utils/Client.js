/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const fs = require('fs'),
      path = require('path'),
      request = require('request'),
      logger = require('./logger')(module),
      cert = path.resolve(__dirname, '../ssl/boeing-truststore.pem');

function Client() {}

Client.prototype.get = function(options, callback) {
  options.method = 'GET';
  doRequest(options, callback);
};

Client.prototype.post = function(options, callback) {
  options.method = 'POST';
  doRequest(options, callback);
};

Client.prototype.put = function(options, callback) {
  options.method = 'PUT';
  doRequest(options, callback);
};

Client.prototype.delete = function(options, callback) {
  options.method = 'DELETE';
  doRequest(options, callback);
};

let doRequest = (options, callback) => {
  options.ca = fs.readFileSync(cert);
  logger.silly('request options: ' + JSON.stringify(options));
  request(options, function(error, response, body) {
    if (!error && response.statusCode >= 200 && response.statusCode < 300) {
      callback(undefined, response, body);
    } else {
      callback(
        error
          ? error
          : { message: 'The server encountered an unknown exception.' },
        response, body
      );
    }
  });
};

module.exports = Client;