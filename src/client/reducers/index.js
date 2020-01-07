/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import formReducer from './formReducer';
import globalReducer from './globalReducer';
import dashboardReducer from './dashboardReducer';
import administrationReducer from './administrationReducer';
import imageUploaderReducer from './imageUploaderReducer';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  global: globalReducer,
  dashboard: dashboardReducer,
  administration: administrationReducer,
  imageUploader: imageUploaderReducer
});

export default rootReducer;