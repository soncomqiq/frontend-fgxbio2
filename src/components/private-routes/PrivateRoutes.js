import React from "react";
import routeConfig from "../../config/roles";
import NotFoundPage from "../../containers/pages/NotFound/NotFound"
import { Switch, Route } from "react-router-dom";

function PrivateRoutes(props) {
  const role = props.role || "guest";

  const allowedRoutes = routeConfig[role];

  return (
    <Switch>
      {allowedRoutes.map((route) => (
        <Route key={route.url} exact path={route.url}>
          <route.page setRole={props.setRole} />
        </Route>
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default PrivateRoutes;
