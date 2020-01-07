/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { SET_GLOBAL_NOTIFICAITON_OBJ } from '../actions/types';

const initialState = {
  notificationObj: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_NOTIFICAITON_OBJ:
      return {...state, notificationObj: action.obj};
    default:
      return state;
  }
};

export default globalReducer;