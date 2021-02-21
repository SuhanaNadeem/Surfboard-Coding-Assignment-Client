import React, { useEffect, useState, useRef, useContext } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { MdPersonOutline } from "react-icons/md";

import { gql, useQuery } from "@apollo/client";
import { GET_MODULE_BY_ID } from "./QuestionCard";

export default function ModuleInputDropdown({
  onChange,
  errors,
  currentModuleId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const {
    data: { getModules: modules } = {},
    loading: loadingModules,
  } = useQuery(GET_MODULES, {
    client: adminClient,
  });

  const {
    data: { getModuleById: currentModule } = {},
    loading: loadingModule,
    error,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: currentModuleId },
    client: adminClient,
  });

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={`shadow text-left appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
          errors.newModuleId ? "border-red-500" : ""
        }`}
      >
        {currentModule ? (
          <p>{currentModule.name}</p>
        ) : (
          <p className=" text-white">Unseen Text</p>
        )}
      </button>
      {isOpen && modules ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="absolute focus:outline-none left-50 w-40 mt-1 py-1 bg-white rounded-lg shadow-xl text-xs font-light z-20">
            {modules.map((module, index) => (
              <button
                onClick={(e) => {
                  toggleIsOpen(e);
                  onChange(e);
                }}
                type="button"
                key={index}
                value={module.id}
                error={errors.newModuleId ? "true" : "false"}
                name="newModuleId"
                className="focus:outline-none text-left font-light w-full block px-2 py-1 text-gray-800 hover:text-white hover:bg-red-800"
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
      name
      id
      createdAt
    }
  }
`;
