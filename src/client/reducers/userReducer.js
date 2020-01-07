/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { UPDATE_USER } from '../actions/types';

const initialState = {
  user: {
    name: '',
    bemsid: '',
    email: '',
    img: ''
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      const user = action.user;
      let updatedUser = { };
      if (user.name) { updatedUser.name = user.name; }
      if (user.bemsid) { updatedUser.bemsid = user.bemsid; }
      if (user.img) { updatedUser.img = user.img; }
      if (user.email) { updatedUser.email = user.email; }

      return {
        ...state,
        user: updatedUser
      };
    default:
      return state;
  }
};

export default userReducer;