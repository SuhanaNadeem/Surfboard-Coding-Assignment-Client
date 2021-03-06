import { useQuery } from "@apollo/client";
import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_COMPLETED_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import CompletedModule from "./CompletedModule";

function CompletedModules({ student }) {
  const { data: { getCompletedModulesByStudent: modules } = {} } = useQuery(
    GET_COMPLETED_MODULES_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: mentorClient,
    }
  );

  return modules && modules.length !== 0 ? (
    <div className="mr-2 flex flex-col w-full md:w-1/2 mt-2">
      <h2 className="text-lg mb-2 text-red-800 ">Completed Modules</h2>

      {modules.map((module, index) => (
        <CompletedModule key={index} module={module} student={student} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default CompletedModules;
