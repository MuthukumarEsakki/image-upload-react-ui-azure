/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import axios from 'axios';
import * as types from './types';

export const fetchUser = () => {
  return dispatch => {
    axios.get('api/user')
      .then(response => dispatch(updateUser(response.data)))
      .catch(err => console.error(err))
  }
};

export const keepAliveUser = () => {
  return dispatch => {
    axios.get('/api/health')
      .then(response => console.log("Keep alive success. " + response.status.toString()))
      .catch(err => console.error(err))
  };
};

export const updateUser = (user) => ({ type: types.UPDATE_USER, user: user });