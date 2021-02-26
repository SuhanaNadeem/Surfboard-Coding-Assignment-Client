import { useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_IN_PROGRESS_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import InProgressModule from "./InProgressModule";

function InProgressModules({ student }) {
  console.log("entered in-progress");
  console.log(student);
  const { data: { getInProgressModulesByStudent: modules } = {} } = useQuery(
    GET_IN_PROGRESS_MODULES_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: adminClient,
    }
  );

  console.log(modules);
  // console.log(student);
  return modules ? (
    <div className="mr-2 flex flex-col w-1/2">
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
