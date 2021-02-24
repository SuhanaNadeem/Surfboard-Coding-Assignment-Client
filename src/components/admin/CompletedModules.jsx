import { useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_COMPLETED_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import CompletedModule from "./CompletedModule";

function CompletedModules({ student }) {
  console.log("in completed modules");
  const { data: { getCompletedModulesByStudent: modules } = {} } = useQuery(
    GET_COMPLETED_MODULES_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: adminClient,
    }
  );
  console.log(modules);
  console.log(student);

  return modules ? (
    <div className="mr-2 flex w-1/2">
      {modules.map((module, index) => (
        <CompletedModule key={index} module={module} student={student} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default CompletedModules;
