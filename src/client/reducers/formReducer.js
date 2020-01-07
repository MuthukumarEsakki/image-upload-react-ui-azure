/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { SET_FORM_PERSONTYPES, SET_FORM_AGE, SET_FORM_NAME, SET_FORM_PERSONTYPE, GET_FORM_RESULTS} from '../actions/types';

const initialState = {
  name: '',
  age: '',
  persontype: '',
  persontypes: [],
  results: ''
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_PERSONTYPES:
      return {...state, persontypes: action.payload};
    case SET_FORM_AGE:
      return {...state, age: action.payload};
    case SET_FORM_NAME:
      return {...state, name: action.payload};
    case SET_FORM_PERSONTYPE:
      return {...state, persontype: action.payload};
    case GET_FORM_RESULTS:
      return {...state, results: action.payload};
    default:
      return state;
  }
};

export default formReducer;