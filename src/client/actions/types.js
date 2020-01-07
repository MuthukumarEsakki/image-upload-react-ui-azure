/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
//global types
export const SET_GLOBAL_NOTIFICAITON_OBJ = 'SET_GLOBAL_NOTIFICAITON_OBJ';
//insite user capture types
export const UPDATE_USER = 'UPDATE_USER';
//example form types
export const SET_FORM_PERSONTYPES = 'SET_FORM_PERSONTYPES';
export const SET_FORM_NAME = 'SET_FORM_NAME';
export const SET_FORM_AGE = 'SET_FORM_AGE';
export const SET_FORM_PERSONTYPE = 'SET_FORM_PERSONTYPE';

export const GET_FORM_RESULTS = 'GET_FORM_RESULTS';

export const SUCCESS = "SUCCESS";
export const INITIAL = "INITIAL";

export const actionStatus = {
    SUCCESS: SUCCESS,
    FAILURE: "FAILURE",
    STARTING: "STARTING",
    INITIAL: INITIAL,
    RETURN_NO_DATA: "RETURN_NO_DATA"
};
export const initialEmptyResults = {
    metadata: {},
    data: [],
    error: '',
    isLoading: false,
    status: actionStatus.INITIAL,
    isEmpty: true
};

//Dashboard
export const FETCH_DASHBOARD_IMAGE_COUNT_DATA = 'FETCH_DASHBOARD_IMAGE_COUNT_DATA';

//Administration
export const FETCH_ADMINISTRATION_TYPES_DATA = 'FETCH_ADMINISTRATION_TYPES_DATA';
export const FETCH_ADMINISTRATION_SUB_TYPES_DATA = 'FETCH_ADMINISTRATION_SUB_TYPES_DATA';
export const FETCH_UPLOAD_TYPES_DATA = 'FETCH_UPLOAD_TYPES_DATA';
export const FETCH_UPLOAD_SUB_TYPES_DATA = 'FETCH_UPLOAD_SUB_TYPES_DATA';

//ImageUploader
export const FETCH_IMAGE_DATA = 'FETCH_IMAGE_DATA';
export const UPLOAD_IMAGE_DATA = 'UPLOAD_IMAGE_DATA';