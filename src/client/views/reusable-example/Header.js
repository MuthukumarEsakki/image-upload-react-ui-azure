/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Header} from 'aims-reusable-react-components';
import {Link} from 'react-router-dom'
const styles = {
  title: {
    color: 'white',
    cursor: 'pointer',
    //fontFamily: 'HelveticaNeueW01-45Ligh',
    textDecoration: 'none'
  },

};

class CustomHeader extends React.Component {
  constructor() {
    super();
    this.state = {
        value:  `${origPath}reusable-header`
      };
  }

  toggleTab = (event, value) => {
    this.setState({
      value
    })
  }

  render() {
    let tabs = [
        {
          label: "First Tab",
          component: Link,
          path: `${origPath}reusable-header`
        },
        {
          label: "Second Tab",
          component: Link,
          path: `${origPath}reusable-header`
        },
      ]
    return (
      <Header 
        toggleTab={this.toggleTab}
        value={this.state.value}
        tabs={tabs}
        title={<p><b>Sweet</b> Header</p>}
        homeLink={`${origPath}`}
        envName='dev'
        isCacheDown
        isServiceDown
        isSSOTimedOut
        statusText='Some serious status'
        statusColor='orange'
        prodURL='https://digitalfactory.web.boeing.com/react-starter/'
        user={this.props.user}
    />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(CustomHeader);