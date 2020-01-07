/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const winston = require('winston'),
      path = require('path');

const { combine, timestamp, label, printf } = winston.format;


let getLabel = (module) => {
  let sections = module.filename.split(path.sep);
  return sections[sections.length - 2] + path.sep + sections.pop();
};

const defaultFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

module.exports = (module) => {
  return winston.createLogger({
    format: combine(
      label({ label: getLabel(module) }),
      timestamp(),
      defaultFormat
    ),
    transports: [
      new winston.transports.Console({
        timestamp: true,
        prettyPrint: true,
        colorize: true,
        level: process.env.LOG_LEVEL || 'info',
        label: getLabel(module)
      })
    ]
  });
};