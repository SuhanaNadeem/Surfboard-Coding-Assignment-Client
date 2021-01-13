import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/student/NavBar";
import DashboardNavBar from "../../components/student/DashboardNavBar";
import DashboardCategories from "../../components/student/DashboardCategories";
import { studentClient } from "../../GraphqlApolloClients";
import DashboardModules from "../../components/student/DashboardModules";

export default function StudentDashboard(props) {
  const { student } = useContext(StudentAuthContext);

  if (!student) {
    props.history.push("/login");
  }

  const {
    data: { getInProgressModulesByStudent: inProgressModules } = {},
    loading: loadingInProgressModules,
  } = useQuery(GET_IN_PROGRESS_MODULES_BY_STUDENT, {
    client: studentClient,
  });

  const {
    data: { getCompletedModulesByStudent: completedModules } = {},
    loading: loadingCompletedModules,
  } = useQuery(GET_COMPLETED_BY_STUDENT, {
    client: studentClient,
  });

  const studentDashboard = student ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32"></div>
      <div className="h-full flex-1 flex mx-48 my-2">
        <DashboardNavBar />
        <div>
          <DashboardCategories />
          <DashboardModules
            modules={inProgressModules}
            type="In Progress Modules"
          />
          <DashboardModules
            modules={completedModules}
            type="Completed Modules"
          />
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
  return studentDashboard;
}

export const GET_IN_PROGRESS_MODULES_BY_STUDENT = gql`
  query getInProgressModulesByStudent {
    getInProgressModulesByStudent {
      name
      id
      categoryId
      questions
    }
  }
`;
export const GET_COMPLETED_BY_STUDENT = gql`
  query getCompletedModulesByStudent {
    getCompletedModulesByStudent {
      name
      id
      categoryId
      questions
    }
  }
`;
