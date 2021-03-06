import { useQuery } from "@apollo/client";
import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_IN_PROGRESS_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import InProgressModule from "./InProgressModule";

function InProgressModules({ student }) {
  const { data: { getInProgressModulesByStudent: modules } = {} } = useQuery(
    GET_IN_PROGRESS_MODULES_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: mentorClient,
    }
  );

  console.log(modules);
  // console.log(student);
  return modules && modules.length !== 0 ? (
    <div className="mr-2 flex flex-col w-full md:w-1/2 mt-2">
      <h2 className="text-lg mb-2 text-red-800 ">In-Progress Modules</h2>

      {modules.map((module, index) => (
        <InProgressModule key={index} module={module} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default InProgressModules;
