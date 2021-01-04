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
    <div className="grid sm:grid-cols-1 md:grid-cols-2 mb-2 gap-4 mx-auto py-4 px-8 md:p-4 w-full md:max-w-2xl xl:max-w-6xl">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-xl hover:shadow-md w-full h-full flex flex-col items-center justify-start py-4 px-6"
        >
          <p className="uppercase tracking-wide text-red-800 font-semibold text-lg w-full pb-4 border-gray-300 border-b-2">
            {category.name}
          </p>
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
