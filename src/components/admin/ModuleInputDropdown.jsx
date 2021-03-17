import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MODULE_BY_ID } from "./QuestionCard";

export default function ModuleInputDropdown({
  onChange,
  errors,
  currentModuleId,
  moduleType,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  var moduleErrors;
  if (moduleType === "newModuleId") {
    moduleErrors = errors.newModuleId;
  } else if (moduleType === "moduleId") {
    moduleErrors = errors.moduleId;
  }
  // console.log(currentModuleId);
  const { data: { getModules: modules } = {} } = useQuery(GET_MODULES, {
    client: adminClient,
  });

  const { data: { getModuleById: currentModule } = {} } = useQuery(
    GET_MODULE_BY_ID,
    {
      variables: { moduleId: currentModuleId },
      client: adminClient,
    }
  );

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={`shadow text-left appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none   ${
          moduleErrors ? "border-red-800" : ""
        }`}
      >
        {currentModule ? (
          <p>{currentModule.name}</p>
        ) : (
          <p className=" text-white">Unseen Text</p>
        )}
      </button>
      {isOpen && modules && moduleType ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="absolute focus:outline-none left-50 w-1/4 mt-1 py-1 bg-white rounded-lg shadow-xl text-sm lg:text-xs font-normal lg:font-light z-20 max-h-32 overflow-y-auto">
            {modules.map((module, index) => (
              <button
                onClick={(e) => {
                  toggleIsOpen(e);
                  onChange(e);
                }}
                type="button"
                key={index}
                value={module.id}
                error={moduleErrors ? "true" : "false"}
                name={moduleType}
                className="focus:outline-none text-left w-full block px-2 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              >
                {module.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export const GET_MODULES = gql`
  {
    getModules {
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
