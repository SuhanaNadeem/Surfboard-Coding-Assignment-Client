import React from "react";

export default function StudentTitleBar() {
  return (
    <div className="bg-gray-800 border-b-2 shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-6 px-8 md:px-0 flex items-center justify-center w-full md:max-w-2xl xl:max-w-5xl">
        <p className="text-white md:flex text-lg  text-bold tracking-wide">
          LYNX Institute
        </p>
      </nav>
    </div>
  );
}
