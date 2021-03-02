import React from "react";
import { MdPersonOutline } from "react-icons/md";

export default function MentorTitleBar() {
  return (
    <div className="bg-black border-b-2 shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-10 px-8 md:px-0 flex items-center justify-center w-full md:max-w-2xl xl:max-w-5xl">
        <div className="flex items-center justify-center text-white md:flex text-xl font-light tracking-wide">
          <p className="mr-2">LYNX Institute Mentor</p>{" "}
          <MdPersonOutline size={32} />
        </div>
      </nav>
    </div>
  );
}
