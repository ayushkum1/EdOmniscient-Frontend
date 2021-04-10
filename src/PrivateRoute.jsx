import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuth, roleAllowed, ...other }) {
  return (
    <Route
      {...other}
      render={(props) => {
        // const user = userCtx.user;
        if (!isAuth) {
          return <Redirect to="/signin" />;
        }
        if (!roleAllowed) {
          // redirect to forbidden page here
          return <Redirect to="/forbidden" />;
          // return <Redirect to="/" />;
        }
        return <Component {...props} />;
        // return isAuth ? <Component {...props} /> : <Redirect to="/signin" />;
      }}
    />
  );
}

export default PrivateRoute;
