import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../components/Header/Header.js";


import routes from "../../routes.js";

const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
      })}
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
);

export default function Explore() {
  return (
      <>
        <Header/>
        <div>Sidebarx</div>
        <div>{switchRoutes}</div>
      </>
    
  );
}
