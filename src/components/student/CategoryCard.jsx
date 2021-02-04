import React from "react";

import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";

import NewModuleCard from "./NewModuleCard";

export default function CategoryCard({ category, props }) {
  const history = useHistory();
  const {
    data: { getModulesByCategory: modules } = {},
    loading: loadingModules,
    error,
  } = useQuery(GET_MODULES_BY_CATEGORY, {
    variables: { categoryId: category.id },
    client: studentClient,
  });
  return modules ? (
    <div className="w-full">
      {modules.map((moduleInfo, index) => (
        <NewModuleCard
          props={props}
          key={index}
          categoryName={category.name}
          moduleInfo={moduleInfo}
        />
      ))}
    </div>
  ) : (
    <div></div>
  );
}
export const GET_MODULES_BY_CATEGORY = gql`
  query getModulesByCategory($categoryId: String!) {
    getModulesByCategory(categoryId: $categoryId) {
      id
      name
      questions
      categoryId
    }
  }
`;
