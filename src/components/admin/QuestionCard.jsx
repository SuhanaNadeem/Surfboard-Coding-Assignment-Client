import React from "react";

import { gql, useQuery } from "@apollo/client";
import { adminClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";

export default function QuestionCard({ props, question, created }) {
  const {
    data: { getModuleById: module } = {},
    loading: loadingModule,
    error,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: question.moduleId },
    client: adminClient,
  });

  return module && question ? (
    <button
      className="focus:outline-none"
      onClick={(e) => {
        props.history.push(`/adminEditAndPreview/${question.id}`);
      }}
    >
      <div
        className={
          created
            ? `bg-gray-100 h-full flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-200 justify-center`
            : `bg-white h-full flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {question.questionName}
        </p>
        <p className=" text-gray-700 font-semibold text-md leading-tight">
          {module.name}
        </p>
        {/* <p className=" text-gray-700 font-thin text-sm">Additional Info </p> */}
        {/* <img
          src={tempModuleCardImg}
          className="rounded-lg object-contain w-full h-32 p-2"
        /> */}
      </div>
    </button>
  ) : (
    <></>
  );
}
export const GET_MODULE_BY_ID = gql`
  query getModuleById($moduleId: String!) {
    getModuleById(moduleId: $moduleId) {
      id
      name
      categoryId
      adminId
      questions
      learningObjectives
      createdAt
    }
  }
`;
