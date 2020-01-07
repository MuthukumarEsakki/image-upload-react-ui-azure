/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setFormAge, setFormName, setFormPersontype, setFormPersontypes, getFormPersontypes, getFormResults, submitForm } from '../actions/index'
import {bindActionCreators} from 'redux';

import { cyan } from '../styles/colors';

const mapStateToProps = state => {
  return {
    form: state.form
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setFormAge,
    setFormName,
    setFormPersontype,
    setFormPersontypes,
    getFormResults,
    getFormPersontypes,
    submitForm
  }, dispatch);
};

class FormDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.getFormPersontypes();
  };

  render = (props) => {
    const { classes } = this.props;
    //setters for the for fields
    const setFormName = this.props.setFormName;
    const setFormPersontype = this.props.setFormPersontype;
    const setFormAge = this.props.setFormAge;
    const submitForm = this.props.submitForm;
    //getters
    const formName = this.props.form.name;
    const formAge = this.props.form.age;
    const formPersontype = this.props.form.persontype;
    const formPersontypes = this.props.form.persontypes;
    const formResults = this.props.form.results;

    return(
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Card style={{height: '300px'}}>
            <CardContent>
              <Typography variant="h6">Sample Form</Typography>
              <div>
                <TextField
                  id="name"
                  label="Name"
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)} />
                <br/>
                <TextField
                    id="age"
                    label="Age"
                    value={formAge}
                    onChange={(event) => setFormAge(event.target.value)} />
                <br/>
                <FormControl style={{minWidth: 120}}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={formPersontype}
                    onChange={(event) => setFormPersontype(event.target.value)}>
                    {formPersontypes.map(persontype => {
                      return (
                        <MenuItem key={persontype} value={persontype}>{persontype}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <br/>
              <Button variant="contained" style={{backgroundColor: cyan[500]}} onClick={() => submitForm({ name: formName, age: formAge, persontype: formPersontype})}>
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{height: '300px'}}>
            <CardContent>
              <Typography variant="h6">POST Response:</Typography>
              <br/>
              <Typography>Results: {formResults}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  };
}

//show specifically that we can connect the state and dispatches
FormDemo = connect(mapStateToProps, mapDispatchToProps)(FormDemo);
//this could also be done in one line: export default connect(mapStateToProps, mapDispatchToProps)(FormDemo)
export default FormDemo;