import React, { useContext, useRef, useState } from "react";
import Footer from "../../components/student/Footer";
import NavBar from "../../components/student/NavBar";

import { StudentAuthContext } from "../../context/studentAuth";

function StudentManageAccount(props) {
  const context = useContext(StudentAuthContext);

  return (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32"></div>
      <Footer />
    </div>
  );
}

export default StudentManageAccount;
