/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
import { common, cyan, steel, viridian, materialBlue } from './colors';

export const themeOptions = {
  typography: {
    //fontFamily: 'HelveticaNeueW01-55Roma,Arial,sans-serif',
    subtitle1: {
      color: 'rgba(0, 0, 0, 0.54)'
    },
    useNextVariants: true
  },
  palette: {
    primary: {
      light: 'rgb(7,106,193)',
      main: 'rgb(7,106,193)',
      dark: materialBlue[700],
      contrastText: common['white']
    },
    secondary: {
      light: viridian[300],
      main: viridian[500],
      dark: viridian[700],
      contrastText: common['white']
    }
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: 'rgb(7,106,193) !important',
        color: common['white']
      },
    },
    MuiTableCell: {
      paddingDense: {
        padding: '4px 4px 4px 10px'
      }
    },
    MuiButton: {
      raised: {
        color: common['white']
      }
    },
    MuiInput: {
      input: {
        height: '100%'
      }
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(0, 12px) scale(0.75)'
      }
    },
    MuiTablePagination: {
      select: {
        paddingRight: 40
      }
    },
    MuiListItem: {
      dense: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiDivider: {
      root: {
        margin: 10
      }
    }
  }
};