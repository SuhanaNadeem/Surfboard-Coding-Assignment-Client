import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { MdMenu, MdPersonOutline } from "react-icons/md";
import { studentClient } from "../../GraphqlApolloClients";

export default function StudentAccountDropdown({ logout, props }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const {
    data: { getStudent: student } = {},
    loading: loadingStudent,
  } = useQuery(GET_STUDENT, {
    client: studentClient,
  });

  if (!loadingStudent && !student) {
    logout();
    studentClient.cache.reset();
  }
  return student ? (
    <div className="relative items-center justify-center inline-block">
      <button
        onClick={toggleIsOpen}
        className="hover:opacity-75 focus:outline-none flex items-center justify-center"
      >
        <MdPersonOutline className="mr-2 hidden md:flex" size={16} />
        {/* <img
          src={tempWhiteLogo}
          className="flex w-5 md:w-0 md:hidden h-full mr-2"
        /> */}
        <MdMenu size={16} className="block md:hidden mr-2" />

        <p className="w-44 text-left truncate font-light">{student.name}</p>
      </button>
      {isOpen ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="focus:outline-none absolute left-0 w-40 mt-2 py-1 bg-white rounded-lg shadow-xl text-sm z-20">
            <h1 className="text-gray-800 text-left px-4 py-1 font-semibold text-xs whitespace-no-wrap overflow-hidden w-36 truncate">
              Hi, {student.name}
              {/* Welcome */}
            </h1>
            <button
              className="block focus:outline-none  focus:ring text-left font-light w-full md:hidden px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);

                props.history.push("/dashboard");
              }}
            >
              Dashboard
            </button>
            {/* <button
              className="block focus:outline-none text-left font-light w-full md:hidden px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              onClick={(e) => {
                // e.preventDefault();
                setIsOpen(false);
                props.history.push("/search");
              }}
            >
              Search
            </button> */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);

                props.history.push("/studentAccount");
              }}
              className="focus:outline-none focus:ring text-left font-light w-full block px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800 "
            >
              Edit Account
            </button>
            <button
              className="text-left font-light w-full block px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800 focus:outline-none focus:ring "
              onClick={(e) => {
                logout();
                studentClient.cache.reset();
              }}
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}

export const GET_STUDENT = gql`
  {
    getStudent {
      id
      name
      email
      quesAnsDict {
        key
        value
        id
      }
      modulePointsDict {
        key
        value
        id
      }
    }
  }
`;
