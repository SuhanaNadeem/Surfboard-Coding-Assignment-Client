import React, { useContext } from "react";
import smallLynxLogo from "../images/512.png";

export default function NavBar({ props }) {

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 mx-8 sm:mx-24 md:mx-32 lg:mx-48 flex items-center justify-center  w-full text-lg">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
              <img
                alt="LYNX Logo"
                src={smallLynxLogo}
                className="focus:outline-none w-5 h-full"
              />
        </div>
      </nav>
    </div>
  );
}
