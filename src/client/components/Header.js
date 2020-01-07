/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Header as CustomHeader} from 'aims-reusable-react-components';

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <CustomHeader 
        user={this.props.user}
        homeLink={this.props.origPath}
        title='Image Classifier'
        showDrawerIcon
        toggleDrawer={this.props.toggleDrawer}
      />
    );
  }
}

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Header);