import React from "react";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";

export default function BadgeCard({ props, badge }) {
  return badge ? (
    <button
      className="focus:outline-none"
      onClick={(e) => {
        console.log("Go Somewhere");
        // props.history.push(`/module/${module.id}`);
      }}
    >
      <div className="bg-white flex-shrink-0 first:ml-2 shadow w-32 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-48 justify-start">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {badge.name}
        </p>
        {/* <p className=" text-gray-700 font-semibold text-md leading-tight">
        {badge.id}
      </p> */}
        {/* <p className=" text-gray-700 font-thin text-sm">{badge.createdAt} </p> */}
        <img
          src={tempModuleCardImg}
          className="rounded-lg object-contain w-full h-32 p-2"
        />
      </div>
    </button>
  ) : (
    <></>
  );
}
