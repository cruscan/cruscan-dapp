import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';

import routes from '../../routes';

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => (
            <Route
                path={prop.layout + prop.path}
                component={prop.component}
                // eslint-disable-next-line react/no-array-index-key
                key={key}
            />
        ))}
        <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
);

export default function Explore() {
    return (
        <>
            <Header />

            {/* <div>{switchRoutes}</div> */}
        </>
    );
}
