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
import { FETCH_IMAGE_DATA, UPLOAD_IMAGE_DATA } from './types';

export const fetchImageData = () => ({
  type: FETCH_IMAGE_DATA
})

export const uploadImageDetail = (name, image) => ({
  // Make upload call here
  type: UPLOAD_IMAGE_DATA,
  data: image
});