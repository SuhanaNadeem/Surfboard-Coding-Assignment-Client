import React, { useEffect, useState, useRef } from "react";

import { useHistory } from "react-router-dom";
// import NavBarDropdown from "./NavBarDropdown";

export default function StudentNavBar() {
  const history = useHistory();
  const [navBar, setNavBar] = useState(false);

  const pageLinksAndTitle = [
    { title: "Dashboard", link: "dashboard" },
    { title: "Learn", link: "learn" },
  ];

  return (
    <div
      className={`${
        navBar
          ? "bg-white transition duration-500 ease-in-out border-b-2 border-blue-600"
          : ""
      } flex fixed items-center justify-center w-full z-10`}
    >
      <nav className="py-4 px-8 md:px-0 flex items-center w-full justify-between md:max-w-2xl xl:max-w-5xl">
        {/* <img
          alt="SN Logo"
          data-aos="zoom-in"
          ref={(el) => {
            imgItem = el;
          }}
          className="opacity-50 h-8"
          src={navBar ? logoBlue : logoWhite}
        /> */}

        <div
          className={`${
            navBar ? "text-blue-600" : "text-white "
          } md:flex items-center text-lg hidden`}
        >
          {pageLinksAndTitle.map((pageInfo) => (
            <button
              key={pageInfo.title}
              onClick={(e) => {
                e.preventDefault();
                history.push(pageInfo.link);
              }}
              className="hover:opacity-75 mr-8 last:mr-0 focus:outline-none"
            >
              {pageInfo.title}
            </button>
          ))}
        </div>
        {/* <NavBarDropdown pageLinksAndTitle={pageLinksAndTitle} /> */}
      </nav>
    </div>
  );
}
