import { useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_IN_PROGRESS_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import InProgressModule from "./InProgressModule";

function InProgressModules({ student }) {
  const { data: { getInProgressModulesByStudent: modules } = {} } = useQuery(
    GET_IN_PROGRESS_MODULES_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: adminClient,
    }
  );

  // console.log(modules);
  // console.log(student);
  return student ? (
    <div className="mr-2 flex flex-col w-full md:w-1/2 mt-2">
      <h2 className="text-xl lg:text-lg mb-2 text-red-800 ">
        In-Progress Modules
      </h2>

      {modules && modules.length !== 0 ? (
        modules.map((module, index) => (
          <InProgressModule key={index} module={module} />
        ))
      ) : (
        <h2 className="font-light text-md lg:text-sm  leading-tight w-1/2 md:w-full text-left ">
          You will see {student.name}'s In-Progress Modules here once they begin
          them.
        </h2>
      )}
    </div>
  ) : (
    <></>
  );
}

export default InProgressModules;
