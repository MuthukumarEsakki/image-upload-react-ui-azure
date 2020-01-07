/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { initialEmptyResults, FETCH_IMAGE_DATA, UPLOAD_IMAGE_DATA } from '../actions/types';

const initialState = {
  imageList: []
};

const administrationReducer = (state = initialState, action) => {  
  switch (action.type) {
    case UPLOAD_IMAGE_DATA:
      return { ...state, imageList: action.data };
    case FETCH_IMAGE_DATA:
      return { ...state, imageList: [] };
    default:
      return state;
  }
};

export default administrationReducer;
