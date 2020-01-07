/*
 *  Copyright (c) 2019 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { fetchUser, keepAliveUser } from './actions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Header, Sidebar, SnackbarNotification} from './components';
import { Dashboard, Home, Administrator, ImageUploader, NotFound } from './views';
import { CustomTable, CustomHeader, CustomAppCard } from './views';
import { themeOptions } from './styles/theme';

import './main.css';
import './webfonts/common/css/fonts.css';
import './webfonts/common/js/hittracker.js';

import { SnackbarProvider } from 'notistack';
import logger from 'redux-logger';

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

let store = createStore(reducer, applyMiddleware(...middlewares)),
  theme = createMuiTheme(themeOptions);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      origPath: '/react-starter/',
    };
  }

  componentDidMount() {
    store.dispatch(fetchUser());
    setInterval(() => {
      store.dispatch(keepAliveUser());
    }, 60000);

    let origPathArray = window.location.pathname.split('/'); //either `react-starter` or null
    let origPath = origPathArray.length > 2 ? `/${origPathArray[1]}/` : '/';
    if (origPath !== '/react-starter/') {
      origPath = '/'; //react-starter.web.boeing.com/reusable-table
    }
    this.setState({path: window.location.pathname, origPath})
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { origPath } = this.state;
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Header toggleDrawer={this.toggleDrawer} origPath={origPath} />
            <Sidebar
              drawerOpen={this.state.drawerOpen}
              toggleDrawer={this.toggleDrawer}
              origPath={origPath} />
            <SnackbarNotification/>
            <div style={{display: 'block', margin: '20px'}}>
            <Switch>
                <Route path={`${origPath}`} exact component={Home}/>
                <Route path={`${origPath}dashboard`} component={Dashboard}/>
                <Route path={`${origPath}administrator`} component={Administrator}/>
                <Route path={`${origPath}image-uploader`} component={ImageUploader}/>
                <Route path={`${origPath}reusable-table`} component={CustomTable}/>
                <Route path={`${origPath}reusable-header`} render={(props) => <CustomHeader {...props} origPath={origPath}/>}/>
                <Route path={`${origPath}reusable-appcard`} component={CustomAppCard}/>
                <Route component={NotFound}/>
              </Switch>

            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('app')
);