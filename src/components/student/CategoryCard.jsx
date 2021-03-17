import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import NewModuleCard from "./NewModuleCard";

export default function CategoryCard({ category, props }) {
  const { student } = useContext(StudentAuthContext);

  const { data: { getIncompleteModulesByCategory: modules } = {} } = useQuery(
    GET_INCOMPLETE_MODULES_BY_CATEGORY,
    {
      variables: { categoryId: category.id, studentId: student && student.id },
      client: studentClient,
    }
  );
  return modules ? (
    <>
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
        <p className="font-normal lg:font-light text-left w-full leading-tight text-md mt-3">
          New {category.name} Modules will appear here.
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
