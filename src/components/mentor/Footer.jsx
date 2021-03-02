import React from "react";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
import { useHistory } from "react-router-dom";
import tempSvg from "../../images/tempSvg.svg";
export default function Footer() {
  const history = useHistory();
  return (
    <div className="bg-white border-t-2 border-gray-300 flex items-center justify-center w-full">
      <nav className="transition duration-500 ease-in-out border-b-1 border-gray-300 py-8 px-8 md:px-0 flex items-center w-full justify-center md:max-w-2xl xl:max-w-5xl">
        <button
          className="focus:outline-none flex items-center justify-center"
          onClick={(e) => history.push("/")}
        >
          {/* <img
            alt="LI Logo"
            className="opacity-50 h-4 md:h-6 flex-shrink-0"
            src={tempSvg}
          /> */}
          <object
            type="image/svg+xml"
            data={tempSvg}
            className="w-6 h-6 "
          ></object>
        </button>
        <p className="ml-4 leading-none text-sm">
          Developed by Suhana Nadeem &#169;
        </p>
      </nav>
    </div>
  );
}
