import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MODULE_POINTS_BY_STUDENT } from "../../pages/student/StudentModule";
import { GET_MODULE_BY_ID } from "./QuestionCard";

function CompletedModule({ student, module }) {
  const {
    data: { getModulePointsByStudent: points } = {},
    loading: loadingPoints,
    pointsError,
  } = useQuery(GET_MODULE_POINTS_BY_STUDENT, {
    variables: { moduleId: module.id, studentId: student.id },
    client: adminClient,
  });

  return points !== undefined && module && student ? (
    <div className="flex">
      <h3 className="mr-2">{module.name}</h3>
      <h2>{points}</h2>
    </div>
  ) : (
    <></>
  );
}

export default CompletedModule;
