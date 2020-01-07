/* eslint-disable react/prop-types */
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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  fetchTypesData,
  fetchSubTypesData,
  updateTypeData,
  updateSubTypeData
} from '../../actions/AdministrationActions';

import {
  TYPE,
  SELECT_TYPE,
  SUB_TYPE
} from '../../components/';

class Administrator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeMenu: null,
      subTypeMenu: null,
      type: '',
      subType: '',
      selectType: '',
      subTypeList: []
    }
  }

  componentDidMount() {
    this.props.fetchTypesData();
    this.props.fetchSubTypesData();
  }

  handleMenuClick = (event, type) => {
    if (type == TYPE) {
      this.setState({
        typeMenu: event.currentTarget,
        subTypeMenu: null
      });
    } else if (type == SUB_TYPE) {
      this.setState({
        typeMenu: null,
        subTypeMenu: event.currentTarget
      });
    }
  };

  handleMenuClose = (event, type) => {
    if (type == TYPE) {
      this.setState({
        typeMenu: null
      });
    } else if (type == SUB_TYPE) {
      this.setState({
        subTypeMenu: null
      });
    }
  };

  handleChange = (event, type) => {
    if (type == SELECT_TYPE) {
      this.setState({
        selectType: event.target.value
      })
      let list = [];
      this.props.subTypeData.data.forEach(element => {
        if (element.type == event.target.value) {
          list.push(element);
        }
      });
      this.setState({
        subTypeList: list
      })
    }
  };

  submitType = () => {
    let type = $("#type-text").val();
    if (type) {
      this.props.updateTypeData(type);
      $("#type-text").val('');
    }
  }

  submitSubType = () => {
    let subType = $("#sub-type-text").val();
    if (this.state.selectType && subType) {
      this.props.updateSubTypeData(this.state.selectType, subType);
      $("#sub-type-text").val('');
      this.setState({
        selectType: ''
      })
    }
  }

  render() {
    const openTypeMenu = Boolean(this.state.typeMenu);
    const openSubTypeMenu = Boolean(this.state.subTypeMenu);
    return (
      <Grid container spacing={16}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={16} direction="row" justify="center">
                <Grid item xl={3} lg={3} md={3} sm={3} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    aria-owns={open ? 'type-menu' : undefined}
                    aria-haspopup="true"
                    color="default"
                    variant="contained"
                    onClick={(event) => this.handleMenuClick(event, TYPE)}
                    style={{ width: '100%', color: '#000' }}>
                    <b>Types</b>
                    <ArrowDropDownIcon fontSize="default" />
                  </Button>
                  <Menu
                    id="type-menu"
                    anchorEl={this.state.typeMenu}
                    open={openTypeMenu}
                    onClose={(event) => this.handleMenuClose(event, TYPE)}
                    TransitionComponent={Fade}>
                    {
                      this.props.typeData.data.map((record, idx) => {
                        return (
                          <MenuItem key={idx} onClick={(event) => this.handleMenuClose(event, TYPE)}>{record.type}</MenuItem>
                        )
                      })
                    }
                  </Menu>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                  <TextField label="Enter New Type..." id="type-text" style={{ width: '100%' }} />
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                  <Button variant="contained" color="primary" onClick={this.submitType}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={16} direction="row" justify="center">
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                  <FormControl>
                    <InputLabel id="select-types-lable">Types</InputLabel>
                    <Select
                      labelid="select-types-lable"
                      value={this.state.selectType}
                      onChange={(event) => this.handleChange(event, SELECT_TYPE)}
                      style={{ marginTop: '20px', width: '200px' }}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        this.props.typeData.data.map((record, idx) => {
                          return (
                            <MenuItem key={idx} value={record.type}>{record.type}</MenuItem>
                          )
                        })
                      }
                    </Select>
                    <FormHelperText>Select Type</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                  <Button
                    aria-owns={open ? 'sub-type-menu' : undefined}
                    aria-haspopup="true"
                    color="default"
                    variant="contained"
                    onClick={(event) => this.handleMenuClick(event, SUB_TYPE)}
                    style={{ width: '200px', color: '#000' }}>
                    <b>Sub-Types</b>
                    <ArrowDropDownIcon fontSize="default" />
                  </Button>
                  <Menu
                    id="sub-type-menu"
                    anchorEl={this.state.subTypeMenu}
                    open={openSubTypeMenu}
                    onClose={(event) => this.handleMenuClose(event, SUB_TYPE)}
                    TransitionComponent={Fade}>
                    {
                      this.state.subTypeList.map((record, idx) => {
                        return (
                          <MenuItem key={idx} onClick={(event) => this.handleMenuClose(event, SUB_TYPE)}>
                            {record.name}
                          </MenuItem>
                        )
                      })
                    }
                  </Menu>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                  <TextField label="Enter New Sub-Type..." id="sub-type-text" style={{ width: '100%' }} />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button variant="contained" color="primary" onClick={this.submitSubType}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTypesData: () => dispatch(fetchTypesData()),
    fetchSubTypesData: () => dispatch(fetchSubTypesData()),
    updateTypeData: (type) => dispatch(updateTypeData(type)),
    updateSubTypeData: (type, subType) => dispatch(updateSubTypeData(type, subType)),
  }
};

const mapStateToProps = state => {
  return {
    typeData: state.administration.typeData,
    subTypeData: state.administration.subTypeData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);