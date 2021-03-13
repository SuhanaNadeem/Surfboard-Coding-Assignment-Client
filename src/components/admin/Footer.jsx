import React from "react";
import { useHistory } from "react-router-dom";
export default function Footer() {
  const history = useHistory();
  return (
    <div className="bg-black text-white border-t-2 border-gray-300 flex items-center z-20 justify-center w-full">
      <nav className="py-8 px-8 md:px-0 flex items-center w-full justify-center md:max-w-2xl xl:max-w-5xl">
        <button
          className="focus:outline-none flex items-center justify-center"
          onClick={(e) => history.push("/adminDashboard")}
        >
          <img
            alt="LI Logo"
            className="w-6 h-full flex-shrink-0"
            src="https://li-images.s3.amazonaws.com/8945722254/tempSvgWhite.png"
          />
          {/* <object
            type="image/svg+xml"
            data={tempSvg}
            className="w-6 h-6 "
          ></object> */}
        </button>
        <p className="ml-4 leading-none text-sm">
          Developed by Suhana Nadeem &#169; 2021
        </p>
      </nav>
    </div>
  );
}
