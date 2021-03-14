import React from "react";
import tempWhiteLogo from "../../images/tempSvgWhite.png";

export default function MentorTitleBar() {
  return (
    <div className="bg-black border-b-2 shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 px-8 md:px-0 flex items-center justify-center w-full md:max-w-2xl xl:max-w-5xl">
        <div className="flex items-center justify-center text-white md:flex text-xl font-light tracking-wide">
          {/* <p className="mr-3">LYNX Institute Mentor</p>

          <img src={tempWhiteLogo} className="w-14 h-full" /> */}
          <img
            src="https://li-images.s3.amazonaws.com/0037927447/dw.png"
            className="object-cover w-48 "
          />
        </div>
      </nav>
    </div>
  );
}
