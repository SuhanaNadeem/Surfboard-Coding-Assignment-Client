import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";

export default function DashboardCategories(props) {
  const history = useHistory();

  const {
    data: { getCategories: categories } = {},
    loading: loadingCategories,
  } = useQuery(GET_CATEGORIES, {
    client: studentClient,
  });

  return categories ? (
    <div>
      <h4 className="pt-6 pl-10 text-3xl w-full flex">Explore Modules</h4>
      <div className="relative">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 mb-2 gap-4 pt-6 pb-4 pl-10 w-full relative md:max-w-2xl xl:max-w-6xl items-stretch">
          {categories.map((category, index) => (
            <div
              key={index}
              className="w-full h-full flex flex-col items-center justify-start"
            >
              <p className="uppercase tracking-wide text-red-800 font-semibold text-lg w-full pb-4 border-gray-300 border-b-2">
                {category.name}
              </p>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
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
