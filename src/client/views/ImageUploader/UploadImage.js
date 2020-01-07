/* eslint-disable react/prop-types */
/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Grid, Button } from '@material-ui/core';

import {
  uploadImageDetail
} from '../../actions/ImageUploaderActions';

const styles = (theme) => ({
  input: {
    display: 'none'
  }
});

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageData: null,
      imageURL: null
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      this.setState({
        imageData: e.target.result
      })
    };
    this.setState({
      name: target.files[0].name,
      imageURL: URL.createObjectURL(target.files[0])
    })
  };

  handleUpload = () => {
    if (this.state.imageData) {
     let imageList = _.cloneDeep(this.props.imageList) || [];
      imageList.push(this.state.imageData);
      this.props.uploadImageDetail(this.state.name, imageList);
      this.setState({
        name: '',
        imageData: null,
        imageURL: null
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid item xs={12} style={{ height: '240px' }}>
          <img src={this.state.imageURL} width="100%" height="auto" style={{ maxHeight: '200px' }} />
          <label>{this.state.name}</label>
        </Grid>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-photo"
          onChange={this.handleCapture}
          type="file"
        />
        <label htmlFor="icon-button-photo">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Button
          variant="contained"
          component="span"
          color="primary" style={{ float: "right" }} onClick={this.handleUpload}>
          Upload
        </Button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImageDetail: (name, image) => dispatch(uploadImageDetail(name, image))
  }
};

const mapStateToProps = state => {
  return {
    imageList: state.imageUploader.imageList
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(UploadImage));