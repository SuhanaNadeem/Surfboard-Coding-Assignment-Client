import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { StudentAuthContext } from "../context/studentAuth";

function StudentAuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(StudentAuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default StudentAuthRoute;
