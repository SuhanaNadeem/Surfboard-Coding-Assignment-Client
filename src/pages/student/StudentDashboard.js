import React, { useContext, useRef, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
import StudentNavBar from "../../components/student/NavBar";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";

export default function StudentDashboard(props) {
  const { student } = useContext(StudentAuthContext);

  if (!student) {
    props.history.push("/login");
  }

  const studentDasboard = student ? (
    <div className="h-full flex flex-col min-h-screen">
      <StudentNavBar />
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>HI</p>
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
