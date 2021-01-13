import React from "react";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";

export default function DashboardModules({ props, modules, type }) {
  const {
    data: { getCategoryById: category } = {},
    loading: loadingCategory,
    error,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: module.categoryId }, // TODO: need to call this only when module exists
    client: studentClient,
  });
  // console.log(modules);

  return modules ? (
    <div className="">
      <h4 className="pt-6 px-10 text-3xl">{type}</h4>

      <div className="flex-grow-0 overflow-x-scroll grid grid-flow-col gap-4 mx-auto py-4 px-8 md:py-4 md:mx-10 md:px-0 md:max-w-2xl xl:max-w-6xl">
        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-white rounded-xl hover:shadow-md h-full flex flex-col items-center justify-center text-center py-4 px-6 w-60"
          >
            <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
              {module.name}
            </p>
            {/* <p className="uppercase tracking-wide text-gray-700 font-thin text-md">
                {category.name}
              </p> */}
            {/* TODO: get images from AWS? - either those of modules or based on category */}
            <p className=" text-gray-700 font-thin text-md">
              {module.questions.length} Questions
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
export const GET_CATEGORY_BY_ID = gql`
  query getCategoryById($categoryId: String!) {
    getCategoryById(categoryId: $categoryId) {
      id
      name
    }
  }
`;
