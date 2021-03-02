import React from "react";
import tempSvg from "../../images/tempSvg.svg";

export default function DashboardStudentCard({ props, student, added }) {
  return student ? (
    <div>
      <div
        className={`${
          added ? `bg-gray-200` : `bg-white`
        }  flex-shrink-0 first:ml-2 shadow w-40 transition-all duration-150 ease-in-out text-sm font-semibold md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start `}
      >
        {/* <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {badge.name}
        </p> */}
        <p className="text-red-800 uppercase font-sm leading-tight w-32 truncate">
          {student.name}
        </p>
        <p className="font-light my-1 w-32">SUMN ELSE</p>
        <p className=" w-32 truncate">SUMN</p>
        {/* <img
          src={badge.image && badge.image !== "" ? badge.image : tempSvg}
          className="object-contain w-full h-14 mt-1"
        /> */}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
