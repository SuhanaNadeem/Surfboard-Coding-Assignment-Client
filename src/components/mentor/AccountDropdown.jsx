import React, { useEffect, useState, useRef, useContext } from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { MdPersonOutline } from "react-icons/md";

import { gql, useQuery } from "@apollo/client";

export default function MentorAccountDropdown({ logout, props }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const { data: { getMentor: mentor } = {}, loading: loadingMentor } = useQuery(
    GET_MENTOR,
    {
      client: mentorClient,
    }
  );

  if (!loadingMentor && !mentor) {
    logout();
    mentorClient.cache.reset();
  }
  return mentor ? (
    <div className="relative items-center justify-center inline-block">
      <button
        onClick={toggleIsOpen}
        className="focus:outline-none flex items-center justify-center"
      >
        <MdPersonOutline size={16} />
        <p className="ml-2 mr-8 font-light hover:opacity-75">
          Hi, {mentor.name}
        </p>
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
              Hi, {mentor.name}
            </h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.history.push("/mentorAccount");
              }}
              className="focus:outline-none text-left font-light w-full block px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
            >
              Edit Account
            </button>
            <button
              className="text-left font-light w-full block px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              onClick={(e) => {
                logout();
                mentorClient.cache.reset();
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

export const GET_MENTOR = gql`
  {
    getMentor {
      id
      name
      email
      orgName
    }
  }
`;
