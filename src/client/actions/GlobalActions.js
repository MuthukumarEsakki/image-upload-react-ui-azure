/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */

'use strict';
import * as types from './types';

export const displayGlobalNotification = (text, variant = undefined, onClick = undefined, autoHideDuration = undefined) => {
  return dispatch => {
    dispatch(setGlobalNotificationObj(text, variant, onClick, autoHideDuration));
  }
};

export const setGlobalNotificationObj = (text, variant, onClick, autoHideDuration) => ({ type: types.SET_GLOBAL_NOTIFICAITON_OBJ, obj: {text, variant, onClick, autoHideDuration}});



