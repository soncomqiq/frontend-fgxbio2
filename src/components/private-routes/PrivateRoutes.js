import React, { useState } from "react";
import routeConfig from "../../config/roles";
import NotFoundPage from "../../containers/pages/NotFound/NotFound";
import { Switch, Route } from "react-router-dom";
import UserNavbar from "../navbar/UserBar";
import GuestNavbar from "../navbar/GuestBar";

function PrivateRoutes(props) {
  const [role, setRole] = useState(props.role || "guest");

  const allowedRoutes = routeConfig[role];

  return (
    <>
      {(role === "guest") ? <GuestNavbar /> : <UserNavbar setRole={setRole} />}
      <Switch>
        {allowedRoutes.map((route) => (
          <Route key={route.url} exact path={route.url}>
            <route.page setRole={setRole} />
          </Route>
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default PrivateRoutes;
