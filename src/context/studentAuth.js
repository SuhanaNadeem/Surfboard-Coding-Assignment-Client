import jwtDecode from "../../node_modules/jwt-decode";
import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.student = decodedToken;
  }
}

const StudentAuthContext = createContext({
  student: null,
  loginStudent: (studentData) => {},
  logoutStudent: () => {},
});

function studentAuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN_STUDENT":
      return {
        ...state,
        student: action.payload,
      };
    case "LOGOUT_STUDENT":
      return {
        ...state,
        student: null,
      };
    default:
      return state;
  }
}

function StudentAuthProvider(props) {
  const [state, dispatch] = useReducer(studentAuthReducer, initialState);

  function loginStudent(studentData) {
    localStorage.setItem("jwtToken", studentData.token);
    dispatch({
      type: "LOGIN_STUDENT",
      payload: studentData,
    });
  }

  function logoutStudent() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT_STUDENT" });
  }

  return (
    <StudentAuthContext.Provider
      value={{ student: state.student, loginStudent, logoutStudent }}
      {...props}
    />
  );
}

export { StudentAuthContext, StudentAuthProvider };
