import React, { useState } from "react";
import { MdMenu } from "react-icons/md";

export default function LandingNavDropdown({ props }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative items-center justify-center inline-block">
      <button
        onClick={toggleIsOpen}
        className="hover:opacity-75 focus:outline-none flex items-center justify-center"
      >
        <MdMenu size={20} className="block md:hidden mr-2" />
      </button>
      {isOpen ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="focus:outline-none absolute left-0 w-40 mt-2 py-1 bg-white rounded-lg shadow-xl text-sm z-20">
            <h1 className="text-gray-800 text-left px-4 py-1 font-semibold text-xs whitespace-no-wrap overflow-hidden w-36 truncate">
              Welcome!
            </h1>
            {/* <button
              className="block focus:outline-none  focus:ring text-left font-light w-full md:hidden px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);

                props.history.push("/dashboard");
              }}
            >
              Mission
            </button>
            <button
              className="block focus:outline-none  focus:ring text-left font-light w-full md:hidden px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);

                props.history.push("/dashboard");
              }}
            >
              Connect
            </button> */}
            <button
              className="block focus:outline-none  focus:ring text-left font-light w-full md:hidden px-4 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);

                props.history.push("/loginAll");
              }}
            >
              Log In
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
