import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

// core components
import Explore from './layouts/Explore/Explore';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/home" component={Explore} />
            <Redirect from="/" to="/home" />
        </Switch>
    </Router>,
    document.getElementById('root')
);
