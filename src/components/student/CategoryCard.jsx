import { StudentAuthContext } from "../../context/studentAuth";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";

import NewModuleCard from "./NewModuleCard";

export default function CategoryCard({ category, props }) {
  const history = useHistory();
  const { student } = useContext(StudentAuthContext);

  const {
    data: { getIncompleteModulesByCategory: modules } = {},
    loading: loadingModules,
    error,
  } = useQuery(GET_INCOMPLETE_MODULES_BY_CATEGORY, {
    variables: { categoryId: category.id, studentId: student && student.id },
    client: studentClient,
  });
  return modules ? (
    <>
      <></>
      {modules.length > 0 ? (
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
        <p className="font-light text-left w-full text-sm mt-3">
          New {category.name} modules will appear here.
        </p>
      )}
    </>
  ) : (
    <></>
  );
}
export const GET_INCOMPLETE_MODULES_BY_CATEGORY = gql`
  query getIncompleteModulesByCategory(
    $categoryId: String!
    $studentId: String!
  ) {
    getIncompleteModulesByCategory(
      categoryId: $categoryId
      studentId: $studentId
    ) {
      id
      name
      questions
      categoryId
    }
  }
`;
