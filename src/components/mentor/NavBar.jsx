import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import { MentorAuthContext } from "../../context/mentorAuth";
import MentorAccountDropdown from "./AccountDropdown";
import tempWhiteLogo from "../../images/tempSvgWhite.png";

export default function MentorNavBar({ props }) {
  const history = useHistory();
  const pageLinksAndTitles = [
    { title: "Dashboard", link: "/mentorDashboard" },
    { title: "Search", link: "/search" },
  ];

  const { mentor, logoutMentor } = useContext(MentorAuthContext);

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center md:h-14 h-16">
      <nav className="py-4 px-8 md:px-0 flex items-center justify-center  w-full md:max-w-2xl xl:max-w-5xl">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
          <div className="items-center flex flex-1 h-full md:h-8 justify-start">
            <MentorAccountDropdown props={props} logout={logoutMentor} />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/loginMentor");
            }}
            className="hover:opacity-75 hidden md:flex font-light items-center justify-center"
          >
            <p className="mr-2">LYNX Institute</p>

            <img src={tempWhiteLogo} className="w-5 h-full" />
          </button>

          <div className="flex-1 flex items-center justify-end">
            {pageLinksAndTitles.map((pageInfo) => (
              <button
                key={pageInfo.title}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(pageInfo.link);
                }}
                className="hidden md:block hover:opacity-75 font-light mr-4 last:mr-2 focus:outline-none"
              >
                {pageInfo.title}
              </button>
            ))}
            <button
              className=" md:hidden flex focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                props.history.push("/loginMentor");
              }}
            >
              <img
                src={tempWhiteLogo}
                className="focus:outline-none w-5 h-full"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}