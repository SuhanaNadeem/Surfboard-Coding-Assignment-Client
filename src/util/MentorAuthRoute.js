import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { MentorAuthContext } from "../context/mentorAuth";

function MentorAuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(MentorAuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default MentorAuthRoute;
