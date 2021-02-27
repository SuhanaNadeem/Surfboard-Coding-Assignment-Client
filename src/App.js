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
import StudentManageAccount from "./pages/student/StudentManageAccount";
import StudentModule from "./pages/student/StudentModule";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreate from "./pages/admin/AdminCreate";
import AdminEditAndPreview from "./pages/admin/AdminEditAndPreview";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <>
      <StudentAuthProvider>
        <Router>
          <Route exact path="/" component={LoginStudent} />
          <StudentAuthRoute exact path="/login" component={LoginStudent} />
          <StudentAuthRoute exact path="/signup" component={SignupStudent} />
          <Route exact path="/dashboard" component={StudentDashboard} />
          <Route exact path="/manageAccount" component={StudentManageAccount} />
          <Route
            exact
            path="/module/:moduleId/:questionId?"
            component={StudentModule}
          />
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
          <AdminAuthRoute
            exact
            path="/adminDashboard"
            component={AdminDashboard}
          />
          <Route exact path="/adminCreate/:page" component={AdminCreate} />
          {/* page indicates what's to be created */}
          <Route exact path="/adminUsers/:userId?" component={AdminUsers} />
          <Route
            exact
            path="/adminEditAndPreview/:givenId?/:questionId?" // givenId is any of the objects, and if it's a module, it may have an addiitonal questionId
            component={AdminEditAndPreview}
          />
        </Router>
      </AdminAuthProvider>
    </>
  );
}

export default App;
