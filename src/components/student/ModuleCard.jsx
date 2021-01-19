import React from "react";

import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
export default function ModuleCard({ props, module }) {
  const history = useHistory();

  const {
    data: { getCategoryById: category } = {},
    loading: loadingCategory,
    error,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: module.categoryId },
    client: studentClient,
  });
  return category && module ? (
    <button
      onClick={(e) => {
        props.history.push("/module:/{module.id}");
      }}
    >
      {/* TODO: SEND needed variables; should it be a page or should you just go to the page, and there's a compoenent there thhat takes the variables */}
      <div className="bg-white flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-64 justify-start">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {module.name}
        </p>
        <p className=" text-gray-700 font-semibold text-md">{category.name}</p>
        <p className=" text-gray-700 font-thin text-sm">
          {module.questions.length} Questions
        </p>
        <img
          src={tempModuleCardImg}
          className="rounded-lg object-contain w-full h-32 p-2"
        />
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
