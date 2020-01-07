/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const moment = require("moment");
import {
    COUNT
} from './constant';

export const buildimageCountChartData = (props) => {
    let colorsArray = ['#013767'];
    let stackNames = [COUNT];
    let dataValues = [...new Set(props.data.map(record => new moment(record.date).utc().format('MM/DD/YYYY')))];
  
    let imageCount = []
    props.data.forEach((record) => {
        imageCount.push(record.count);
    });
  
    let options = {
      tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: {
          type: 'shadow'
        }
      },
      color: colorsArray,
      grid: {
        left: '3%',
        right: '3%',
        bottom: '8%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        barMaxWidth: 25,
        name: 'Count of Image Uploaded',
        nameLocation: 'middle',
        nameGap: 50,
      },
      xAxis: {
        type: 'category',
        axisTick: { show: true },
        data: dataValues,
        name: 'Date',
        nameLocation: 'middle',
        nameGap: 35
      },
      legend: {
        data: stackNames,
        top: 10
      },
      series: [
        {
          name: COUNT,
          type: 'bar',
          stack: 'pcOnTime',
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          data: imageCount,
        }
      ]
    };
    return options;
  }