import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>

      <Router>
        <Route exact path="/" component={Welcome} />
      </Router>
      
    </>
  );
}

export default App;
