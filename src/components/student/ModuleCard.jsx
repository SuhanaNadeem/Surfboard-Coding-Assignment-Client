import React from "react";
import { BsStarFill } from "react-icons/bs";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
import tempSvg from "../../images/tempSvg.png";
import { StudentAuthContext } from "../../context/studentAuth";
import { useContext } from "react";

export default function ModuleCard({ props, module }) {
  // const {context} = useContext(StudentAuthContext);
  const {
    data: { getCategoryById: category } = {},
    loading: loadingCategory,
    error,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: module.categoryId },
    client: studentClient,
  });
  const {
    data: { getStudent: student } = {},
    loading: loadingStudent,
  } = useQuery(GET_STUDENT, {
    client: studentClient,
  });

  return category && module && student ? (
    <button
      onClick={(e) => {
        // console.log(module.id);
        props.history.push(`/module/${module.id}`);
      }}
      className="focus:outline-none"
    >
      <div className="bg-white flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {module.name}
        </p>
        <p className="pb-1 text-gray-700 font-semibold text-md leading-tight   w-40 truncate">
          {category.name}
        </p>
        <div className="flex items-center justify-center">
          <p className="  text-gray-700 font-thin text-sm">
            {module.questions.length} Questions
          </p>
          {student.starredModules.includes(module.id) && (
            <BsStarFill size={20} className="pl-2" />
          )}
        </div>
        <img
          src={
            module.image && module.image !== ""
              ? module.image
              : "https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
          }
          className={`${
            module.image && module.image !== ""
              ? `object-cover`
              : `object-contain`
          } w-full h-32 rounded-lg overflow-hidden m-2`}
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
export const GET_STUDENT = gql`
  query getStudent {
    getStudent {
      id
      name
      starredQuestions
      starredModules
    }
  }
`;
