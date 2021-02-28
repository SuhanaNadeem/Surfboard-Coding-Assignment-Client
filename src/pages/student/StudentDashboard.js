import { StudentAuthContext } from "../../context/studentAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/student/NavBar";
import DashboardNavBar from "../../components/student/DashboardNavBar";
import DashboardCategories from "../../components/student/DashboardCategories";
import { studentClient } from "../../GraphqlApolloClients";
import DashboardModules from "../../components/student/DashboardModules";
import Footer from "../../components/student/Footer";

export default function StudentDashboard(props) {
  const { student } = useContext(StudentAuthContext);
  // console.log("in dash");
  // console.log(student);
  // console.log(props);
  if (!student) {
    props.history.push("/login");
  }

  const {
    data: { getInProgressModulesByStudent: inProgressModules } = {},
    loading: loadingInProgressModules,
  } = useQuery(GET_IN_PROGRESS_MODULES_BY_STUDENT, {
    client: studentClient,
    variables: { studentId: student.id },
  });

  const {
    data: { getCompletedModulesByStudent: completedModules } = {},
    loading: loadingCompletedModules,
  } = useQuery(GET_COMPLETED_MODULES_BY_STUDENT, {
    client: studentClient,
    variables: { studentId: student.id },
  });

  // console.log(inProgressModules);
  // console.log(student.id);

  const studentDashboard = student ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32"></div>
      <div className="h-full flex-1 flex mx-48 mt-4 mb-8">
        <DashboardNavBar />
        <div className="md:w-5/6 last:mt-4">
          <DashboardCategories props={props} />
          <DashboardModules
            props={props}
            modules={inProgressModules}
            type="In-Progress Modules"
          />
          <DashboardModules
            props={props}
            modules={completedModules}
            type="Completed Modules"
          />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return studentDashboard;
}

export const GET_IN_PROGRESS_MODULES_BY_STUDENT = gql`
  query getInProgressModulesByStudent($studentId: String!) {
    getInProgressModulesByStudent(studentId: $studentId) {
      name
      id
      categoryId
      questions
      image
    }
  }
`;
export const GET_COMPLETED_MODULES_BY_STUDENT = gql`
  query getCompletedModulesByStudent($studentId: String!) {
    getCompletedModulesByStudent(studentId: $studentId) {
      name
      id
      image
      categoryId
      questions
    }
  }
`;
