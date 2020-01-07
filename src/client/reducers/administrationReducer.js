/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import {
  initialEmptyResults,
  FETCH_ADMINISTRATION_TYPES_DATA,
  FETCH_ADMINISTRATION_SUB_TYPES_DATA,
  FETCH_UPLOAD_TYPES_DATA,
  FETCH_UPLOAD_SUB_TYPES_DATA
} from '../actions/types';

const initialState = {
  typeData: initialEmptyResults,
  subTypeData: initialEmptyResults,
};

let typesData = {
  data: [
    {
      type: 'Camera'
    },
    {
      type: 'Location'
    },
    {
      type: 'Season'
    },
    {
      type: 'Time'
    },
    {
      type: 'Optical'
    },
    {
      type: 'File format'
    }
  ]
};

let subTypesData = {
  data: [
    {
      type: 'Camera',
      name: 'Canon D35'
    },
    {
      type: 'Camera',
      name: 'Canon EOS 7D'
    },
    {
      type: 'Camera',
      name: 'Canon EOS 80D'
    },
    {
      type: 'Camera',
      name: 'Nikon D850'
    },
    {
      type: 'Camera',
      name: 'Nikon D750'
    },
    {
      type: 'Location',
      name: 'Delhi'
    }
  ]
};

const administrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINISTRATION_TYPES_DATA:
      return { ...state, typeData: typesData };
    case FETCH_ADMINISTRATION_SUB_TYPES_DATA:
      return { ...state, subTypeData: subTypesData };
    case FETCH_UPLOAD_TYPES_DATA:
      typesData.data.push(action.data);
      return { ...state, typeData: typesData };
    case FETCH_UPLOAD_SUB_TYPES_DATA:
      subTypesData.data.push(action.data);
      return { ...state, subTypeData: subTypesData };
    default:
      return state;
  }
};

export default administrationReducer;
