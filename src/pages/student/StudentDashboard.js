import { gql, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import DashboardBadges from "../../components/student/DashboardBadges";
import DashboardCategories from "../../components/student/DashboardCategories";
import DashboardModules from "../../components/student/DashboardModules";
import DashboardSideBar from "../../components/student/DashboardSideBar";
import Footer from "../../components/student/Footer";
import LoadingScreen from "../../components/student/LoadingScreen";
import { GET_STUDENT_BY_ID } from "../../components/student/ModuleSummaryBar";
import NavBar from "../../components/student/NavBar";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import tempIcon from "../../images/icon1.png";
import WelcomeModal from "../../components/student/WelcomeModal";

export default function StudentDashboard(props) {
  const { student } = useContext(StudentAuthContext);
  // console.log("in dash");
  // console.log(student);
  // console.log(props);
  if (!student) {
    props.history.push("/login");
  }
  var isNewUser = props.match.params.welcome;
  const [welcomeIsOpen, setWelcomeIsOpen] = useState(
    isNewUser === "welcome" ? true : false
  );
  // console.log(welcomeIsOpen);
  function toggleWelcomeIsOpen(e) {
    e.preventDefault();
    setWelcomeIsOpen(!welcomeIsOpen);
  }
  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId: student && student.id },

      client: studentClient,
    }
  );
  const {
    data: { getInProgressModulesByStudent: inProgressModules } = {},
  } = useQuery(GET_IN_PROGRESS_MODULES_BY_STUDENT, {
    client: studentClient,
    variables: { studentId: student && student.id },
  });

  const {
    data: { getCompletedModulesByStudent: completedModules } = {},
  } = useQuery(GET_COMPLETED_MODULES_BY_STUDENT, {
    client: studentClient,
    variables: { studentId: student && student.id },
  });
  const { data: { getBadgesByStudent: badges } = {} } = useQuery(
    GET_BADGES_BY_STUDENT,
    {
      client: studentClient,
      variables: { studentId: student && student.id },
    }
  );

  // console.log(inProgressModules);
  // console.log(student.id);

  const studentDashboard = studentObject ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <WelcomeModal
        welcomeIsOpen={welcomeIsOpen}
        toggleWelcomeIsOpen={toggleWelcomeIsOpen}
        studentObject={studentObject}
      />
      <NavBar props={props} />
      {/* mx-8 sm:mx-24 md:mx-32 lg:mx-48     ml-8 sm:ml-24 md:ml-32 lg:ml-48*/}

      <div className="bg-red-800 w-full h-40 flex items-center justify-start overflow-hidden ">
        <div className="flex w-full items-center justify-start mx-8 sm:mx-24 md:mx-32 lg:mx-48 overflow-hidden  ">
          {/* <div className="bg-red-800 w-full h-40 flex items-center justify-start overflow-hidden mx-8 sm:mx-24 md:mx-32 lg:mx-48"> */}
          {/* <div
            className="bg-cover w-28 h-28 bg-center bg-no-repeat mr-4 flex-shrink-0 flex"
            style={{
              backgroundImage: `url(${tempIcon})`,
            }}
          ></div> */}
          <img
            className="mr-4 w-24 flex-shrink-0 flex h-full object-contain"
            alt="Student Icon"
            src={
              studentObject.icon && studentObject.icon !== ""
                ? `${studentObject.icon}`
                : `${tempIcon}`
            }
          />
          <DashboardBadges props={props} badges={badges} />
        </div>
      </div>
      <div className="h-full flex-col flex md:flex-1 md:flex-row mx-8 sm:mx-24 md:mx-32 lg:mx-48 mt-4 mb-8">
        <DashboardSideBar props={props} />
        <div className="md:w-5/6 w-full mt-4 lg:pl-10 md:pl-8">
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
    <LoadingScreen />
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
export const GET_BADGES_BY_STUDENT = gql`
  query getBadgesByStudent($studentId: String!) {
    getBadgesByStudent(studentId: $studentId) {
      name
      id
      image
      type
      requiredAmount
      adminId
      description
    }
  }
`;
