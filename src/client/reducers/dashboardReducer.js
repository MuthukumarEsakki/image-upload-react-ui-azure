/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { initialEmptyResults, FETCH_DASHBOARD_IMAGE_COUNT_DATA } from '../actions/types';

const initialState = {
  imageCount: initialEmptyResults,
};

let imageCount = {
  data: [{
    date: '2019-12-22',
    count: 122
  },
  {
    date: '2019-12-23',
    count: 22
  },
  {
    date: '2019-12-24',
    count: 182
  },
  {
    date: '2019-12-25',
    count: 212
  },
  {
    date: '2019-12-26',
    count: 82
  }]
}
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_IMAGE_COUNT_DATA:
      return { ...state, imageCount: imageCount };
    default:
      return state;
  }
};

export default dashboardReducer;
