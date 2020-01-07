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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import UploadImage from './UploadImage';

import {
  TYPE,
  SUB_TYPE
} from '../../components/';

import {
  fetchTypesData,
  fetchSubTypesData
} from '../../actions/AdministrationActions';

import {
  fetchImageData
} from '../../actions/ImageUploaderActions';

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      subType: '',
      addedType: [],
      selectedImage: null,
      subTypeList: []
    }
  }

  componentDidMount() {
    this.props.fetchTypesData();
    this.props.fetchSubTypesData();
    this.props.fetchImageData();
  }

  handleChange = (event, type) => {
    if (type == TYPE) {
      let list = [];
      this.props.subTypeData.data.forEach(element => {
        if (element.type == event.target.value) {
          list.push(element);
        }
      });
      this.setState({
        subTypeList: list
      })
      this.setState({
        type: event.target.value
      })
    } else if (type == SUB_TYPE) {
      this.setState({
        subType: event.target.value
      })
    }
  };

  addTypeToList = () => {
    let data = {
      type: this.state.type,
      subType: this.state.subType
    }
    let addedType = this.state.addedType;
    addedType.push(data);
    this.setState({
      addedType: addedType,
      type: '',
      subType: ''
    })
  }

  handleImageClick = (imageData) => {
    this.setState({
      selectedImage: imageData
    })
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
          <Card>
            <CardContent style={{ height: '308px', overflow: 'auto' }}>
              <Typography variant="h6">Selected Photograph for tagging</Typography>
              <Grid container spacing={16} style={{ marginTop: "20px" }}>
                {
                  this.props.imageList.map((record, idx) => {
                    return (
                      <Grid item xs={12} md={3} key={idx} style={{ width: '200px', height: '150px' }}>
                        <Paper elevation={3} style={{ width: '100%', height: '100%' }}>
                          <img src={record} style={{ width: '100%', height: '100%' }} onClick={() => this.handleImageClick(record)} />
                        </Paper>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Browse for Photograph
              </Typography>
              <UploadImage />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={16} direction="row" justify="center">
                <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                  <Typography variant="h6">
                    Selected Photograph for tagging
                  </Typography>
                  <Grid item xs={12} md={12} style={{ width: '400px', height: '300px' }}>
                    <img src={this.state.selectedImage} width="100%" height="100%" />
                  </Grid>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <Grid container spacing={16} style={{ padding: '0px 20px' }}>
                    <Grid item xl={12} sm={12}>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel id="select-types-lable">Types</InputLabel>
                        <Select
                          labelid="select-types-lable"
                          value={this.state.type}
                          onChange={(event) => this.handleChange(event, TYPE)}
                          style={{ marginTop: '20px', width: '100%' }}>
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
                    <Grid item xl={12} sm={12}>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel id="select-types-lable">Sub Types</InputLabel>
                        <Select
                          labelid="select-types-lable"
                          value={this.state.subType}
                          onChange={(event) => this.handleChange(event, SUB_TYPE)}
                          style={{ marginTop: '20px', width: '100%' }}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {
                            this.state.subTypeList.map((record, idx) => {
                              return (
                                <MenuItem key={idx} value={record.name}>{record.name}</MenuItem>
                              )
                            })
                          }
                        </Select>
                        <FormHelperText>Select Sub-Type</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xl={12} sm={12}>
                      <TextField label="Addintion Info..." style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xl={12} sm={12} style={{ display: 'flex', justifyContent: 'end' }}>
                      <Button variant="contained" color="primary" onClick={() => this.addTypeToList()}>
                        Add Tag
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                  <div style={{ maxHeight: '250px', overflow: 'auto', width: '100%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Sub-Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.addedType.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.subType}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Grid>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="contained" color="secondary">
                  Submit
                </Button>
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
    fetchImageData: () => dispatch(fetchImageData()),
  }
};

const mapStateToProps = state => {
  return {
    typeData: state.administration.typeData,
    subTypeData: state.administration.subTypeData,
    imageList: state.imageUploader.imageList
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);