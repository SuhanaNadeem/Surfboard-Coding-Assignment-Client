import { useQuery } from "@apollo/client";
import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_COMPLETED_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import CompletedModule from "./CompletedModule";

function CompletedModules({ student }) {
  const { data: { getCompletedModulesByStudent: modules } = {} } = useQuery(
    GET_COMPLETED_MODULES_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: mentorClient,
    }
  );

  return student ? (
    <div className="mr-2 flex flex-col w-full md:w-1/2 mt-2">
      <h2 className="text-xl lg:text-lg mb-2 text-red-800 ">
        Completed Modules
      </h2>

      {modules && modules.length !== 0 ? (
        modules.map((module, index) => (
          <CompletedModule key={index} module={module} student={student} />
        ))
      ) : (
        <h2 className="font-normal lg:font-light text-md lg:text-sm  leading-tight w-full text-left ">
          You will see {student.name}'s Completed Modules here once they begin
          them.
        </h2>
      )}
    </div>
  ) : (
    <></>
  );
}

export default CompletedModules;
