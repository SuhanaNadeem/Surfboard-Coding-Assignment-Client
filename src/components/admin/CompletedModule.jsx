import { useQuery } from "@apollo/client";
import React from "react";
import { BiCheckboxChecked } from "react-icons/bi";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MODULE_POINTS_BY_STUDENT } from "../../pages/student/StudentModule";

function CompletedModule({ student, module }) {
  const {
    data: { getModulePointsByStudent: points } = {},
    loading: loadingPoints,
    pointsError,
  } = useQuery(GET_MODULE_POINTS_BY_STUDENT, {
    variables: { moduleId: module.id, studentId: student && student.id },
    client: adminClient,
  });

  return points !== undefined && module && student ? (
    <div className="flex items-start justify-start mb-2">
      <BiCheckboxChecked size={24} />
      <h3 className="font-semibold mx-1 text-sm uppercase truncate">
        {module.name}
      </h3>
      <h2 className="font-light truncate text-sm">({points} LYNX Tokens)</h2>
    </div>
  ) : (
    <></>
  );
}

export default CompletedModule;
