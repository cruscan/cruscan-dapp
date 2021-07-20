import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// core components
import Home from './layouts/Home.js'
import Explore from './layouts/Explore'

ReactDOM.render(
  <Router>
    <Switch>
            <Route path="/home" component={Explore} />
            <Route path="/order" component={Explore} />
            <Redirect from="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById('root')
);