import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";

const initialState = {
  admin: null,
};

if (localStorage.getItem("adminJwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("adminJwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("adminJwtToken");
  } else {
    initialState.admin = decodedToken;
  }
}

const AdminAuthContext = createContext({
  admin: null,
  loginAdmin: (adminData) => {},
  logoutAdmin: () => {},
});

function adminAuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    case "LOGOUT_ADMIN":
      return {
        ...state,
        admin: null,
      };
    default:
      return state;
  }
}

function AdminAuthProvider(props) {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);

  function loginAdmin(adminData) {
    localStorage.setItem("adminJwtToken", adminData.token);
    dispatch({
      type: "LOGIN_ADMIN",
      payload: adminData,
    });
  }

  function logoutAdmin() {
    localStorage.removeItem("adminJwtToken");
    dispatch({ type: "LOGOUT_ADMIN" });
  }

  return (
    <AdminAuthContext.Provider
      value={{ admin: state.admin, loginAdmin, logoutAdmin }}
      {...props}
    />
  );
}

export { AdminAuthContext, AdminAuthProvider };
