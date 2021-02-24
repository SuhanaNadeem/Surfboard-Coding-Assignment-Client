import React, { useEffect, useState, useRef, useContext } from "react";

import { useHistory } from "react-router-dom";
// import NavBarDropdown from "./NavBarDropdown";
import { AdminAuthContext } from "../../context/adminAuth";
import { useForm } from "../../util/hooks";
import { gql, useQuery } from "@apollo/client";
import AdminAccountDropdown from "./AccountDropdown";
import { MdPersonOutline } from "react-icons/md";
import { VscSearch } from "react-icons/vsc";
export default function NavBar(props) {
  const history = useHistory();
  const pageLinksAndTitles = [
    { title: "Dashboard", link: "/adminDashboard" },
    { title: "Users", link: "/adminUsers" },
    { title: "Search", link: "/search" },
  ];

  const { admin, logoutAdmin } = useContext(AdminAuthContext);

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 px-8 md:px-0 flex items-center justify-center  w-full md:max-w-2xl xl:max-w-5xl">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
          <div className="items-center flex flex-1 h-full md:h-8 justify-start">
            <AdminAccountDropdown props={props} logout={logoutAdmin} />
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-2">LYNX Institute</p> <MdPersonOutline size={16} />
          </div>
          <div className="flex-1 flex items-center justify-end">
            {pageLinksAndTitles.map((pageInfo) => (
              <button
                key={pageInfo.title}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(pageInfo.link);
                }}
                className="hover:opacity-75 font-light mr-4 last:mr-2 focus:outline-none"
              >
                {pageInfo.title}
              </button>
            ))}
            <VscSearch size={15} />
          </div>
        </div>
      </nav>
    </div>
  );
}
