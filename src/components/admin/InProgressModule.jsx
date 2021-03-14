import { useQuery } from "@apollo/client";
import React from "react";
import { BiCheckbox } from "react-icons/bi";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_TOTAL_POSSIBLE_MODULE_POINTS } from "../../pages/student/StudentModule";

function InProgressModule({ module }) {
  const { data: { getTotalPossibleModulePoints: points } = {} } = useQuery(
    GET_TOTAL_POSSIBLE_MODULE_POINTS,
    {
      variables: { moduleId: module.id },
      client: adminClient,
    }
  );

  return points !== undefined && module ? (
    <div className="flex items-start justify-start mb-2">
      <BiCheckbox size={24} class="flex-shrink-0" />
      <h3 className="font-semibold mx-1 text-sm uppercase truncate w-36">
        {module.name}
      </h3>
      <h2 className="font-light truncate text-sm">({points} LYNX Tokens)</h2>
    </div>
  ) : (
    <></>
  );
}

export default InProgressModule;
