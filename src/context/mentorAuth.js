import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";

const initialState = {
  mentor: null,
};

if (localStorage.getItem("mentorJwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("mentorJwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("mentorJwtToken");
  } else {
    initialState.mentor = decodedToken;
  }
}

const MentorAuthContext = createContext({
  mentor: null,
  loginMentor: (mentorData) => {},
  logoutMentor: () => {},
});

function mentorAuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN_MENTOR":
      return {
        ...state,
        mentor: action.payload,
      };
    case "LOGOUT_MENTOR":
      return {
        ...state,
        mentor: null,
      };
    default:
      return state;
  }
}

function MentorAuthProvider(props) {
  const [state, dispatch] = useReducer(mentorAuthReducer, initialState);

  function loginMentor(mentorData) {
    localStorage.setItem("mentorJwtToken", mentorData.token);
    dispatch({
      type: "LOGIN_MENTOR",
      payload: mentorData,
    });
  }

  function logoutMentor() {
    localStorage.removeItem("mentorJwtToken");
    dispatch({ type: "LOGOUT_MENTOR" });
  }

  return (
    <MentorAuthContext.Provider
      value={{ mentor: state.mentor, loginMentor, logoutMentor }}
      {...props}
    />
  );
}

export { MentorAuthContext, MentorAuthProvider };
