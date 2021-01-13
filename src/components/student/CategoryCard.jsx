import { MdPersonOutline } from "react-icons/md";
import React from "react";

import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { GiMorphBall } from "react-icons/gi";
import { BsCodeSlash } from "react-icons/bs";
import { RiWirelessChargingLine } from "react-icons/ri";
import { GrPersonalComputer } from "react-icons/gr";

export default function CategoryCard({ props, category }) {
  const history = useHistory();
  const {
    data: { getModulesByCategory: modules } = {},
    loading: loadingModules,
    error,
  } = useQuery(GET_MODULES_BY_CATEGORY, {
    variables: { categoryId: category.id },
    client: studentClient,
  });

  return modules ? (
    <div className="w-full">
      {modules.map((moduleInfo, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-start mt-2"
        >
          {category.name === "Programming" && <BsCodeSlash size={32} />}
          {category.name === "Electrical" && (
            <RiWirelessChargingLine size={32} />
          )}
          {category.name === "Computer-Aided Design" && (
            <GrPersonalComputer size={32} />
          )}

          {category.name !== "Programming" &&
            category.name !== "Electrical" &&
            category.name !== "Computer-Aided Design" && (
              <GiMorphBall size={32} />
            )}

          <p className="ml-6 tracking-wide font-thin mt-4 mb-4 text-lg">
            {moduleInfo.name}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
export const GET_MODULES_BY_CATEGORY = gql`
  query getModulesByCategory($categoryId: String!) {
    getModulesByCategory(categoryId: $categoryId) {
      id
      name
      questions
      categoryId
    }
  }
`;
