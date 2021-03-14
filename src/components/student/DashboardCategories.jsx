import { gql, useQuery } from "@apollo/client";
import React from "react";
import { studentClient } from "../../GraphqlApolloClients";
import CategoryCard from "./CategoryCard";

export default function DashboardCategories({ props }) {
  const { data: { getCategories: categories } = {} } = useQuery(
    GET_CATEGORIES,
    {
      client: studentClient,
    }
  );

  return categories ? (
    <div>
      <h4 className=" text-3xl w-full flex">Modules to Explore</h4>
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 w-full relative md:max-w-2xl xl:max-w-6xl items-stretch">
          {categories.map((category, index) => (
            <div
              key={index}
              className="w-full h-full flex flex-col items-center justify-start"
            >
              <p className="uppercase tracking-wide text-red-800 font-semibold text-lg truncate w-full pb-2 mb-2 md:mb-0 md:pb-4 border-gray-300 border-b-2">
                {category.name}
              </p>
              <CategoryCard category={category} props={props} />
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
