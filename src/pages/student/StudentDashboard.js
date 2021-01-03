import React, { useContext, useRef, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
import NavBar from "../../components/student/NavBar";
import DashboardNavBar from "../../components/student/DashboardNavBar";
import DashboardContent from "../../components/student/DashboardContent";

// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";

export default function StudentDashboard(props) {
  const { student } = useContext(StudentAuthContext);

  if (!student) {
    props.history.push("/login");
  }

  const studentDasboard = student ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32"></div>
      <div className="h-full flex flex-row ml-48 my-2 w-full md:max-w-xs">
        <DashboardNavBar />
        <div className="w-full">
          <DashboardContent />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return studentDasboard;
}
