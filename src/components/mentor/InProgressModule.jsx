import { gql, useQuery } from "@apollo/client";
import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_TOTAL_POSSIBLE_MODULE_POINTS } from "../../pages/student/StudentModule";

import { BiCheckbox } from "react-icons/bi";
function InProgressModule({ module }) {
  const {
    data: { getTotalPossibleModulePoints: points } = {},
    loading: loadingPoints,
    pointsError,
  } = useQuery(GET_TOTAL_POSSIBLE_MODULE_POINTS, {
    variables: { moduleId: module.id },
    client: mentorClient,
  });

  return points !== undefined && module ? (
    <div className="flex items-start justify-start mb-2">
      <BiCheckbox size={24} />
      <h3 className="font-semibold mx-1 text-sm uppercase truncate">
        {module.name}
      </h3>
      <h2 className="font-light text-sm truncate">({points} LYNX Tokens)</h2>
    </div>
  ) : (
    <></>
  );
}

export default InProgressModule;
