import React from "react";
import LI_logo from "../../images/li_logo.svg";

export default function LandingTitleBar() {
  return (
    <div className="bg-black border-b-2 shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 px-8 md:px-0 flex items-center justify-center w-full md:max-w-2xl xl:max-w-5xl">
        <div className="flex items-center justify-center text-white md:flex text-xl font-light tracking-wide">
          <img src={LI_logo} className="object-cover w-48 " alt="LI Logo" />
        </div>
      </nav>
    </div>
  );
}
