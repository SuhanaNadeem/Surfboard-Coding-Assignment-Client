import { MdPersonOutline } from "react-icons/md";
import React from "react";

import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";

export default function CategoryCard({ props, category }) {
  const history = useHistory();
  const {
    data: { getModulesByCategory: modules } = {},
    loading: loadingModules,
    error,
  } = useQuery(GET_MODULES_BY_CATEGORY, {
    variables: { categoryId: category.id },
    client: studentClient,
  });
  if (modules) {
    console.log(modules);
  } else if (loadingModules) {
    console.log("Loading moduls");
  } else {
    console.log(error);
    console.log(category.id);
  }
  return (
    <div>
      <div className="flex items-center justify-center text-white">
        {modules &&
          modules.map((moduleInfo, index) => (
            <div key={index}>
              <MdPersonOutline size={16} />
              <p>{moduleInfo.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export const GET_MODULES_BY_CATEGORY = gql`
  query getModulesByCategory($categoryId: String!) {
    getModulesByCategory(categoryId: $categoryId) {
      id
      name
    }
  }
`;
