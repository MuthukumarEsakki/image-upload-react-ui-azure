/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import React from 'react';
import _ from 'lodash';
import faker from 'faker';
import {Table} from 'aims-reusable-react-components';
import {IconButton} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';

const columns = [
    {
        id: "title",
        label: "Title",
        tooltipTitle: "title tooltip",
        cell: row => (
          <div style={{width: 140, display:'flex', alignItems:'center', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'nowrap', borderRightWidth: 2, borderColor: 'rgb(230,232,236)'}}>
            <div style={{display:"flex", alignItems:'center', flexDirection: 'row', justifyContent:'flex-start'}}>
             <IconButton color="default" aria-label="arrow_back">
                  <HomeIcon />
              </IconButton>
              {row.title}
            </div>
          </div>
          ),
      headerCell: row => (
          <div style={{textAlign: 'left'}}><b>{row.label}</b></div>
      ),
      headerStyle: {
        whitespace: 'nowrap',
        display: 'flex',
        justifyContent: 'center',
      },
      bodyStyle: {
          display: 'flex',
          justifyContent: 'center',
      },
      firstColumn: true,
      initColumnWidth: 220
    },
    {
      id: "key",
      label: "Group",
      tooltipTitle: "key tooltip"
    },
    {
        id: "description",
        label: "Description",
        tooltipTitle: "description tooltip"
    },
    {
        id: "address",
        label: "Address",
        tooltipTitle: "address tooltip"
    },
    {
        id: "price",
        label: "Price",
        tooltipTitle: "price tooltip"
    },
    {
      id: "phone",
      label: "Phone",
    },
    {
      id: "firstName",
      label: "First Name",
    },
    {
      id: "lastName",
      label: "Last Name",
    },
    {
      id: "jobTitle",
      label: "Job Title",
    },
];

const filters = [
  {
      type: 'search',
      label: 'First Name',
      id: 'firstName',
      searchOnColumns: ['firstName']
  },
  {
      type: 'dropdown',
      label: 'Last Name',
      id: 'lastName',
      function: (row, value) => (row['lastName'] == 'Gene'),
      options: [
          { value: 'Bob', label: 'Bob'},
          { value: 'Jon', label: 'Jon'}
      ]
  },
  {
      type: 'search',
      label: 'Search Columns',
      id: 'title',
      suggestions: 'true',
      searchOnColumns: ['title', 'description', 'address', 'price']
  },
]

const table_data = _.times(1000, () => ({
  key: `Group ${faker.random.number({ 'min': 1, 'max': 9 })}`,
  title: faker.company.companyName(),
  description: faker.company.catchPhrase().substring(0,30),
  address: faker.address.streetAddress(),
  price: faker.finance.amount(0, 100, 2, '$'),
  phone: faker.phone.phoneNumber(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  jobTitle: faker.name.jobTitle(),
}));

const getUniqueKey = (row, index) => {
  return `${row.key}-${index}`;
}

const CustomTable = () => {
  console.log("rendering custom table");
  return (
    <div style={{ display: 'block', margin: '20px', marginTop: '0px' }}>
    <Table
        columns={columns}
        filters={filters}
        title={"Custom Table"}
        subtitle={"Awesome subtitle"}
        data={table_data}
        hover
        orderBy={'key'}
        isExpandable
        groupKey={'key'}
        uniqueKeyFn={getUniqueKey}
    >
    </Table>
    </div>
  );
};

export default CustomTable;