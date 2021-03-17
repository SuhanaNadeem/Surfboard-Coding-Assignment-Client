import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";

export default function AdminInputDropdown({
  onChange,
  errors,
  currentAdminId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const { data: { getAdmins: admins } = {} } = useQuery(GET_ADMINS, {
    client: adminClient,
  });

  const { data: { getAdminById: currentAdmin } = {} } = useQuery(
    GET_ADMIN_BY_ID,
    {
      variables: { adminId: currentAdminId },
      client: adminClient,
    }
  );

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={`shadow text-left appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none   ${
          errors.newAdminId ? "border-red-800" : ""
        }`}
      >
        {currentAdmin ? (
          <p>{currentAdmin.name}</p>
        ) : (
          <p className=" text-white">Unseen Text</p>
        )}
      </button>
      {isOpen && admins ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="absolute focus:outline-none left-50 w-1/4 mt-1 py-1 bg-white rounded-lg shadow-xl text-sm lg:text-xs font-normal lg:font-light z-20 max-h-32 overflow-y-auto">
            {admins.map((admin, index) => (
              <button
                onClick={(e) => {
                  toggleIsOpen(e);
                  onChange(e);
                }}
                type="button"
                key={index}
                value={admin.id}
                error={errors.newAdminId ? "true" : "false"}
                name="newAdminId"
                className="focus:outline-none text-left w-full block px-2 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              >
                {admin.name}
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

export const GET_ADMINS = gql`
  {
    getAdmins {
      name
      id
      createdAt
    }
  }
`;

export const GET_ADMIN_BY_ID = gql`
  query getAdminById($adminId: String!) {
    getAdminById(adminId: $adminId) {
      id
      name
      password
      email
      token
      createdAt
    }
  }
`;
