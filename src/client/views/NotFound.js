/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */

'use strict';
import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const NotFound = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">404 - Page Not Found</Typography>
        <Typography variant="subtitle1">Uh oh!</Typography>
        <br/>
        <Typography variant="body2">
          Sorry! The page you requested could not be found.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" href="/">
          <HomeIcon/> Return Home
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotFound;