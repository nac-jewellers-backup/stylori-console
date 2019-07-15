import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  pageType,
  type,
  auth,
  ...rest
}) => (
    // use redux and verify here.
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} pageType={pageType} type={type} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
