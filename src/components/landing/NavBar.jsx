import React from "react";
import { useHistory } from "react-router-dom";
// import { AdminAuthContext } from "../../context/adminAuth";
import LI_logo from "../../images/li_logo.svg";
import smallLynxLogo from "../../images/512.png";
import LandingNavDropdown from "./NavDropdown";
// import AdminAccountDropdown from "./AccountDropdown";
import useGAEventTracker from "../../hooks/useGAEventTracker";

export default function NavBar({ props }) {
  const history = useHistory();
  const pageLinksAndTitles = [
    // { title: "Mission", link: "/landingMission" }, // will just be a "#"
    // { title: "Connect", link: "/landingConnect" }, // will just be a "#"
    { title: "Log In", link: "/loginAll" },
    // { title: "Sign Up", link: "/signupLanding" },
  ];

  // const { logoutAdmin } = useContext(AdminAuthContext);
  const GAEventsTracker = useGAEventTracker("External Links");

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 mx-8 sm:mx-24 md:mx-32 lg:mx-48 flex items-center justify-center  w-full text-lg">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
          <div className="items-center flex flex-1 h-full md:h-8 justify-start md:hidden">
            <LandingNavDropdown props={props} />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push("/");
              GAEventsTracker("WelcomeLYNX");
            }}
            className="hover:opacity-75 hidden md:flex font-light items-center justify-center  focus:outline-none focus:ring"
          >
            <img src={LI_logo} className="object-cover w-36 " alt="LI Logo" />
          </button>
          <div className="flex-1 flex items-center justify-end">
            {pageLinksAndTitles.map((pageInfo) => (
              <button
                key={pageInfo.title}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(pageInfo.link);
                  GAEventsTracker(pageInfo.title);
                }}
                className={`hidden md:block hover:opacity-75 font-light focus:outline-none ${
                  pageInfo.title !== "Sign Up" && `mr-4`
                }`}
              >
                {pageInfo.title}
              </button>
            ))}
            <button
              className=" md:hidden flex focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                props.history.push("/");
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
