/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const user = (this.props.user) ? this.props.user : {};
    const { origPath } = this.props;
    return (
      <React.Fragment>
        <Drawer
          type="temporary"
          open={this.props.drawerOpen}
          onClose={this.props.toggleDrawer}>
          <div className="navbar">
            <div className="Boeing-logo-wrapper">
              <div className="Boeing-logo">
                <img src="img/boeing-logo-small.png" width="114" height="26" />
              </div>
            </div>
            <Divider />
            <List>
              <NavLink to={`${origPath}`} activeClassName="active" exact>
                <ListItem button onClick={this.props.toggleDrawer}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </NavLink>
              <NavLink to={`${origPath}dashboard`} activeClassName="active" exact>
                <ListItem button onClick={this.props.toggleDrawer}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </NavLink>
              <NavLink to={`${origPath}image-uploader`} activeClassName="active" exact>
                <ListItem button onClick={this.props.toggleDrawer}>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Image Uploader" />
                </ListItem>
              </NavLink>
              <NavLink to={`${origPath}administrator`} activeClassName="active" exact>
                <ListItem button onClick={this.props.toggleDrawer}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administrator" />
                </ListItem>
              </NavLink>
            </List>
          </div>
          <div className="support-menu" style={{ fontSize: '12px', color: '#666', height: '25px', padding: '15px' }}>
            Copyright &copy; 2018 The Boeing Company
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Sidebar);