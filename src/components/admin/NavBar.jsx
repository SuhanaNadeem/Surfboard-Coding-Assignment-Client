import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AdminAuthContext } from "../../context/adminAuth";
// import Logo from "../../images/LI_Logo.jpeg"
// import li_logo from "../../images/li-logo.svg";
import LI_logo from "../../images/li_logo.svg";
import tempWhiteLogo from "../../images/tempSvgWhite.png";
import AdminAccountDropdown from "./AccountDropdown";

export default function NavBar({ props }) {
  const history = useHistory();
  const pageLinksAndTitles = [
    { title: "Dashboard", link: "/adminDashboard" },
    { title: "Users", link: "/adminUsers" },
    // { title: "Search", link: "/search" },
  ];

  const { logoutAdmin } = useContext(AdminAuthContext);

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 px-8 md:px-0 flex items-center justify-center  w-full md:max-w-2xl xl:max-w-5xl text-lg">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
          <div className="items-center flex flex-1 h-full md:h-8 justify-start">
            <AdminAccountDropdown props={props} logout={logoutAdmin} />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/loginAdmin");
            }}
            className="hover:opacity-75 hidden md:flex font-light items-center justify-center  focus:outline-none focus:ring"
          >
            {/* <p className="mr-2">LYNX Institute</p> */}
            {/* <MdPersonOutline size={16} /> */}
            {/* <imgs
              src="https://li-images.s3.amazonaws.com/8945722254/tempSvgWhite.png"
              className="w-6 h-full"
            /> */}
            <img src={LI_logo} className="object-cover w-36 " alt="LI Logo" />

            {/* <div
              className="bg-cover w-152 h-32 bg-center bg-no-repeat   mx-auto"
              style={{
                backgroundImage: `url(https://li-images.s3.amazonaws.com/1622532725/dw.png)`,
              }}
            ></div> */}
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
                props.history.push("/loginAdmin");
              }}
            >
              <img
                alt="LYNX Logo"
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
