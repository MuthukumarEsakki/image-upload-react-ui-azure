/*
 * ==================================================================
 * Copyright (c) 2019 Boeing. All Rights Reserved.
 * Printing, copying, reproducing or electronically transmitting this
 * software and its associated documentation in whole or in part, in
 * any form whatever, is subject to the terms of the Software License
 * Agreement by and between The Boeing Company and LICENSEE.
 * ==================================================================
 */

'use strict';
import {
    FETCH_ADMINISTRATION_TYPES_DATA,
    FETCH_ADMINISTRATION_SUB_TYPES_DATA,
    FETCH_UPLOAD_TYPES_DATA,
    FETCH_UPLOAD_SUB_TYPES_DATA
} from './types';

export const fetchTypesData = () => ({
    type: FETCH_ADMINISTRATION_TYPES_DATA
});

export const fetchSubTypesData = () => ({
    type: FETCH_ADMINISTRATION_SUB_TYPES_DATA
});

export const updateTypeData = (type) => ({
    type: FETCH_UPLOAD_TYPES_DATA,
    data: {
        type: type
    }
});

export const updateSubTypeData = (type, subType) => ({
    type: FETCH_UPLOAD_SUB_TYPES_DATA,
    data: {
        type: type,
        name: subType
    }
});