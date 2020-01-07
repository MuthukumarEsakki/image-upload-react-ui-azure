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
      logger = require('../utils/logger')(module);

router.get('/options', (req, res) => {
  logger.info('GET /form request received');
  res.send(['Man', 'Woman', 'Child'])
});

router.post('/', (req, res) => {
  logger.info('POST /form request received: ', req.body);
  res.send(req.body);
});

module.exports = router;