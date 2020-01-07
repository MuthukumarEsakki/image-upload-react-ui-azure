/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {
  buildimageCountChartData
} from './imageClassifierChartBuildOptions';

import { fetchImageCountData } from '../../actions/DashboardActions';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchImageCountData();
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                Image Trend - Daily
              </Typography>
              <ReactEcharts
                option={buildimageCountChartData(this.props.imageCount)}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: '300px' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImageCountData: () => dispatch(fetchImageCountData())
  }
};

const mapStateToProps = state => {
  return {
    imageCount: state.dashboard.imageCount
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);