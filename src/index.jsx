import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Main from './components/Main';
import LandingView from './components/view/LandingView';

const App = () => (
  <Main>
    <LandingView />
  </Main>
);

const Init = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

// Render the main component into the dom
ReactDOM.render(
  <Init />,
  document.getElementById('app'),
);
