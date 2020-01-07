/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const express = require('express'),
      router = express.Router(),
      eureka = require('eureka-server-starter'),
      logger = require('../utils/logger')(module);

router.get('/instance/:instance', (req, res) => {
  logger.info('GET /instance request received');
  const instance = req.params.instance;
  logger.info("Querying the discovery service for instance " + instance);
  res.json(eureka.service.getInstancesByAppId(instance));
});

router.get('/', (req, res) => {
  logger.info('GET / request received to display all instances');
  res.json(eureka.service.getInstances());
});

module.exports = router;