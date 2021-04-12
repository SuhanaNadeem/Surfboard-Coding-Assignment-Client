import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MentorAuthContext } from "../../context/mentorAuth";
import LI_logo from "../../images/li_logo.svg";
import smallLynxLogo from "../../images/512.png";
import MentorAccountDropdown from "./AccountDropdown";

export default function MentorNavBar({ props }) {
  const history = useHistory();
  const pageLinksAndTitles = [
    { title: "Dashboard", link: "/mentorDashboard" },
    // { title: "Search", link: "/search" },
  ];

  const { logoutMentor } = useContext(MentorAuthContext);

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center md:h-14 h-16">
      <nav className="py-4 mx-8 sm:mx-24 md:mx-32 lg:mx-48 flex items-center justify-center  w-full text-lg">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
          <div className="items-center flex flex-1 h-full md:h-8 justify-start">
            <MentorAccountDropdown props={props} logout={logoutMentor} />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/loginMentor");
            }}
            className="hover:opacity-75 hidden md:flex font-light items-center justify-center  focus:outline-none focus:ring"
          >
            {/* <p className="mr-2">LYNX Institute</p>
            <img
              src="https://li-images.s3.amazonaws.com/8945722254/tempSvgWhite.png"
              className="w-6 h-full"
            /> */}
            {/* <img
              src="https://li-images.s3.amazonaws.com/1622532725/dw.png"
              className="object-cover w-36 "
              alt="LI Logo"
            /> */}
            <img src={LI_logo} className="object-cover w-36" alt="LI Logo" />
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
                alt="LYNX Logo"
                src={smallLynxLogo}
                className="focus:outline-none w-5 h-full"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
