import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";

export default function DashboardContent(props) {
  const history = useHistory();

  const {
    data: { getCategories: categories } = {},
    loading: loadingCategories,
  } = useQuery(GET_CATEGORIES, {
    client: studentClient,
  });

  return categories ? (
    <div className="text-black flex flex-row items-center justify-center">
      {categories.map((category, index) => (
        <div key={index}>
          <p>{category.name}</p>
          <CategoryCard category={category} />
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
export const GET_CATEGORIES = gql`
  {
    getCategories {
      id
      name
    }
  }
`;
