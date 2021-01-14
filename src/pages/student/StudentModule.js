import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/student/NavBar";

export default function StudentModule({ props }) {
  // const moduleId= props.;

  const { student } = useContext(StudentAuthContext);

  if (!student) {
    props.history.push("/login");
  }

  const studentModule = student ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32"></div>
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return studentModule;
}
