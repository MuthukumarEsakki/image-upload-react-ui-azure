/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const config = require('config'),
      express = require('express'),
      router = express.Router(),
      logger = require('../utils/logger')(module),
      Client = require('../utils/Client');

router.get('/', (req, res) => {
  let restClient = new Client();

  if (req.jwt) {
    let userData = {
      name: req.jwt.friendlyName,
      bemsid: req.jwt.sub
    };

    // Use InSite API to get the user's profile image
    restClient.get({ url: config.insite.userUrl + userData.bemsid }, (err, response, body) => {
      if (err) {
        logger.error(`FAILED to retrieve InSite data for user ${req.headers.boeingbemsid} - Status: ${response.statusCode}, Error: ${err.message}, Details: ${err.details}`);
        res.status(500).send({ message: `FAILED to retrieve InSite data: ${err.message}` });
      } else {
        let data = JSON.parse(body);
        if (data && data.resultholder && data.resultholder.profiles &&
          data.resultholder.profiles.profileholder && data.resultholder.profiles.profileholder) {
          // Extract the image path and construct the full URL for the user's profile image
          let profileInfo = data.resultholder.profiles.profileholder;
          if (profileInfo.imageUrl) { userData.img = config.insite.imageUrl + profileInfo.imageUrl; }

          // Extract the user's name, e-mail
          if (profileInfo.user) {
            userData.name = profileInfo.user.firstName + ' ' + profileInfo.user.lastName;
            userData.email = profileInfo.user.emailAddress;
          }
        }
        res.status(200).send(userData);
      }
    });
  } else {
    // res.status(401).send({ message: 'WSSO headers not found' });
    let testUser = {
      name: 'Test User',
      bemsid: 12345,
      img: 'https://insite.web.boeing.com/culture/images/profile-default.gif'
    };
    res.status(200).send(testUser);
  }
});

module.exports = router;