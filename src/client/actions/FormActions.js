/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import axios from 'axios';
import { relativePath } from './url-utils';
import * as types from './types';

export const getFormPersontypes = () => {
  return dispatch => {
    axios.get('api/form/options')
    .then((response) => {
      dispatch(setFormPersontypes(response.data));
    })
    .catch((error) => {
      console.error(error);
    });
  }
};

export const submitForm = (form) => {
  return dispatch => {
    axios.post('/api/form', form)
      .then((response) => {
        console.log('POST /form SUCCESS: ' + JSON.stringify(response.data));
        dispatch(getFormResults(JSON.stringify(response.data)));
      })
      .catch((error) => {
        console.error(error);
      })
  }
};

export const setFormName = (name) => ({ type: types.SET_FORM_NAME, payload: name});
export const setFormAge = (age) => ({ type: types.SET_FORM_AGE, payload: age});
export const setFormPersontype = (type) => ({ type: types.SET_FORM_PERSONTYPE, payload: type});
export const setFormPersontypes = (persontypes) => ({ type: types.SET_FORM_PERSONTYPES, payload: persontypes});
export const getFormResults = (results) => ({ type: types.GET_FORM_RESULTS , payload: results });


