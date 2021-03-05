import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_MODULE_POINTS_BY_STUDENT } from "../../pages/student/StudentModule";

import { BiCheckboxChecked } from "react-icons/bi";
function CompletedModule({ student, module }) {
  const {
    data: { getModulePointsByStudent: points } = {},
    loading: loadingPoints,
    pointsError,
  } = useQuery(GET_MODULE_POINTS_BY_STUDENT, {
    variables: { moduleId: module.id, studentId: student.id },
    client: mentorClient,
  });

  return points !== undefined && module && student ? (
    <div className="flex items-start justify-start mb-2">
      <BiCheckboxChecked size={24} />
      <h3 className="font-semibold mx-1 text-sm uppercase">{module.name}</h3>
      <h2 className="font-light text-sm">({points} LYNX Tokens)</h2>
    </div>
  ) : (
    <></>
  );
}

export default CompletedModule;