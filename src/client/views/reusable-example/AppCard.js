/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import {AppCard} from 'aims-reusable-react-components';
import {orange, materialBlue as blue} from '../../styles/colors';

class CustomAppCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
            <AppCard
                title='My App'
                url='https://digitalfactory.web.boeing.com/'
                btnText='Lets go!'
                description='Super awesome app'
                color={orange[300]}
                isUp
                checkHealth={true}
                isRetired={false}
                appName='myapp'
            />
            <br/>
            <AppCard
                title='My Other App'
                url='https://digitalfactory.web.boeing.com/'
                btnText='Lets go!'
                description='Super awesome other app'
                color={blue[500]}
                isUp={false}
                checkHealth={true}
                isRetired={false}
                appName='myapp'
            />
            <br/>
            <AppCard
                title='My Retired App'
                url='https://digitalfactory.web.boeing.com/'
                btnText='Lets go!'
                description='Super retired app'
                color={blue[500]}
                isRetired={true}
                checkHealth={true}
                appName='myapp'
            />
       </div>
    );
  }
}

export default CustomAppCard;