import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { AdminAuthProvider } from "./context/adminAuth";
import { MentorAuthProvider } from "./context/mentorAuth";
import { StudentAuthProvider } from "./context/studentAuth";
import AdminCreate from "./pages/admin/AdminCreate";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditAccount from "./pages/admin/AdminEditAccount";
import AdminEditAndPreview from "./pages/admin/AdminEditAndPreview";
import AdminUsers from "./pages/admin/AdminUsers";
import LoginAdmin from "./pages/admin/LoginAdmin";
// import SignupAdmin from "./pages/admin/SignupAdmin";
import LoginAll from "./pages/landing/LoginAll";
import Welcome from "./pages/landing/Welcome";
import LoginMentor from "./pages/mentor/LoginMentor";
import MentorAccount from "./pages/mentor/MentorAccount";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import SignupMentor from "./pages/mentor/SignupMentor";
import LoginStudent from "./pages/student/LoginStudent";
import SignupStudent from "./pages/student/SignupStudent";
import StudentAccount from "./pages/student/StudentAccount";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentModule from "./pages/student/StudentModule";
import AdminAuthRoute from "./util/AdminAuthRoute";
import MentorAuthRoute from "./util/MentorAuthRoute";
import StudentAuthRoute from "./util/StudentAuthRoute";

function App() {
  return (
    <>
      <StudentAuthProvider>
        <Router>
          {/* <Route exact path="/" component={LoginStudent} /> */}
          <StudentAuthRoute exact path="/login" component={LoginStudent} />
          <StudentAuthRoute exact path="/signup" component={SignupStudent} />
          <Route
            exact
            path="/dashboard/:welcome?"
            component={StudentDashboard}
          />
          <Route exact path="/studentAccount" component={StudentAccount} />
          <Route
            exact
            path="/module/:moduleId/:questionId?"
            component={StudentModule}
          />
          {/* <Route exact path="/" component={Welcome} />
          <Route exact path="/loginAll" component={LoginAll} /> */}
        </Router>
      </StudentAuthProvider>
      <Router>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/loginAll" component={LoginAll} />
      </Router>
      <MentorAuthProvider>
        <Router>
          <MentorAuthRoute exact path="/loginMentor" component={LoginMentor} />
          <MentorAuthRoute
            exact
            path="/signupMentor"
            component={SignupMentor}
          />
          <Route
            exact
            path="/mentorDashboard/:studentId?"
            component={MentorDashboard}
          />
          <Route exact path="/mentorAccount" component={MentorAccount} />
        </Router>
      </MentorAuthProvider>

      <AdminAuthProvider>
        <Router>
          <AdminAuthRoute exact path="/loginAdmin" component={LoginAdmin} />
          {/* <AdminAuthRoute exact path="/signupAdmin" component={SignupAdmin} /> */}
          <AdminAuthRoute
            exact
            path="/adminDashboard/:welcome?"
            component={AdminDashboard}
          />
          <Route exact path="/adminEditAccount" component={AdminEditAccount} />

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
