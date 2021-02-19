import React from "react";

import { gql, useQuery } from "@apollo/client";
import { adminClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
export default function QuestionTemplateCard({ props, questionTemplate }) {
  const {
    data: { getCategoryById: category } = {},
    loading: loadingCategory,
    error,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: questionTemplate.categoryId },
    client: adminClient,
  });

  return category && questionTemplate ? (
    <button
      className="focus:outline-none"
      onClick={(e) => {
        console.log("Go Somewhere");
        // props.history.push(`/module/${module.id}`);
      }}
    >
      <div className="bg-white flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {questionTemplate.name}
        </p>
        <p className="text-gray-700 font-semibold text-md leading-tight">
          {category.name}
        </p>
        <p className="text-gray-700 font-thin text-sm">
          {questionTemplate.inputFields.length} Input Fields
        </p>
        {/* <img
          src={tempModuleCardImg}
          className="rounded-lg object-contain w-full h-32 p-2"
        /> */}
      </div>
    </button>
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
