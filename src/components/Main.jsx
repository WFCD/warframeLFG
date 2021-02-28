import {Component} from 'react';
import Button from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import '../styles/App.css';

import { cyan, grey, pink } from '@material-ui/core/colors';

import { AppBar, SvgIcon } from '@material-ui/core';


const muiTheme = createMuiTheme({
  palette: {
    primary1Color: cyan['500'],
    primary2Color: cyan['700'],
    primary3Color: grey['400'],
    accent1Color: pink['A200'],
    accent2Color: grey['100'],
    accent3Color: grey['500'],
    textColor: 'rgba(0, 0, 0, 0.87)',
    alternateTextColor: 'white',
    canvasColor: 'white',
    borderColor: grey['300'],
    pickerHeaderColor: cyan['500'],
    shadowColor: 'black'
  }
});

//import theme from 'styles/EnergyBeeTheme';
class AppComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      appData: []
    }
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
}

  render(){
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar
            style={{backgroundColor: 'white !important'}}
            title='WarframeLFG.io'
            titleStyle={{color: cyan['500'], textAlign: 'center', fontWeight: 100}}
            iconElementLeft={<Button iconClassName="material-" ></Button>}
            />
        </MuiThemeProvider>
        {this.props.children}
      </div>
    )
  }
}

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

module.exports = AppComponent;
