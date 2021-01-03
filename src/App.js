import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StudentAuthProvider } from "./context/studentAuth";
import { MentorAuthProvider } from "./context/mentorAuth";
import { AdminAuthProvider } from "./context/adminAuth";
import StudentAuthRoute from "./util/StudentAuthRoute";
import MentorAuthRoute from "./util/MentorAuthRoute";
import AdminAuthRoute from "./util/AdminAuthRoute";
import LoginStudent from "./pages/student/LoginStudent";
import SignupStudent from "./pages/student/SignupStudent";
import SignupMentor from "./pages/mentor/SignupMentor";
import LoginMentor from "./pages/mentor/LoginMentor";
import SignupAdmin from "./pages/admin/SignupAdmin";
import LoginAdmin from "./pages/admin/LoginAdmin";
import StudentDashboard from "./pages/student/StudentDashboard";

function App() {
  return (
    <>
      <StudentAuthProvider>
        <Router>
          <Route exact path="/" component={LoginStudent} />
          <StudentAuthRoute exact path="/login" component={LoginStudent} />
          <StudentAuthRoute exact path="/signup" component={SignupStudent} />
          <Route exact path="/dashboard" component={StudentDashboard} />
        </Router>
      </StudentAuthProvider>

      <MentorAuthProvider>
        <Router>
          <MentorAuthRoute exact path="/loginMentor" component={LoginMentor} />
          <MentorAuthRoute
            exact
            path="/signupMentor"
            component={SignupMentor}
          />
        </Router>
      </MentorAuthProvider>

      <AdminAuthProvider>
        <Router>
          <AdminAuthRoute exact path="/loginAdmin" component={LoginAdmin} />
          <AdminAuthRoute exact path="/signupAdmin" component={SignupAdmin} />
        </Router>
      </AdminAuthProvider>
    </>
  );
}

export default App;
