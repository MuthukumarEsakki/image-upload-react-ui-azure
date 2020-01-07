/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';


import React from "react";
import {bindActionCreators} from "redux";
import { withSnackbar } from 'notistack';
import {
  displayGlobalNotification,
} from "../actions";
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => {
  return {
    notificationObj: state.global.notificationObj,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    displayGlobalNotification,
  }, dispatch);
};

class SnackbarNotification extends React.Component {
  constructor() {
    super();
  }

  render = () => {
    const { notificationObj, enqueueSnackbar } = this.props;
    if (Object.keys(notificationObj).length > 0) {
      let options = {};

      if (notificationObj.variant === undefined) {
        options['variant'] = "default"
      } else {
        options['variant'] = notificationObj.variant;
      }
      if (notificationObj.onClick !== undefined) {
        options['onClickAction'] = notificationObj.onClick;
      }
      if (notificationObj.autoHideDuration !== undefined) {
        options['autoHideDuration'] = notificationObj.autoHideDuration;
      }

      enqueueSnackbar(notificationObj.text, options);
    }
    return (
      <div/>
    )
  };
}

SnackbarNotification = connect(mapStateToProps,mapDispatchToProps)(SnackbarNotification);
SnackbarNotification = withSnackbar(SnackbarNotification);
export default SnackbarNotification;