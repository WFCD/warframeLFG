import React, { Component } from 'react';
import { AppBar, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars

import '../styles/App.css';

import { cyan, grey, pink } from '@material-ui/core/colors';

const muiTheme = createMuiTheme({
  palette: {
    primary1Color: cyan['500'],
    primary2Color: cyan['700'],
    primary3Color: grey['400'],
    accent1Color: pink.A200,
    accent2Color: grey['100'],
    accent3Color: grey['500'],
    textColor: 'rgba(0, 0, 0, 0.87)',
    alternateTextColor: 'white',
    canvasColor: 'white',
    borderColor: grey['300'],
    pickerHeaderColor: cyan['500'],
    shadowColor: 'black',
  },
});

// import theme from 'styles/EnergyBeeTheme';
module.exports = class AppComponent extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // appData: [],
    };
  }

  getChildContext() {
    return { muiTheme };
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar
            style={{ backgroundColor: 'white !important' }}
            title="WarframeLFG.io"
            titleStyle={{ color: cyan['500'], textAlign: 'center', fontWeight: 100 }}
            iconElementLeft={<Button iconClassName="material-" />}
          />
        </MuiThemeProvider>
        {children}
      </div>
    );
  }
};
