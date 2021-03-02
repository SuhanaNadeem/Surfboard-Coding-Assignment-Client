import React from "react";
import tempSvg from "../../images/tempSvg.svg";

export default function AccountBadgeCard({ props, badge, earned }) {
  return badge ? (
    <div>
      <div
        className={`${
          earned ? `bg-white` : `bg-gray-200`
        }  flex-shrink-0 first:ml-2 shadow w-40 transition-all duration-150 ease-in-out text-sm font-semibold md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start `}
      >
        {/* <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {badge.name}
        </p> */}
        <p className="text-red-800 uppercase font-sm leading-tight w-32 truncate">
          {badge.name}
        </p>
        <p className="font-light my-1 w-32">{badge.description}</p>
        <p className=" w-32 truncate">
          {badge.requiredAmount}{" "}
          {`${badge.type === "Module" ? `Modules` : `Questions`}`}
        </p>
        <img
          src={badge.image && badge.image !== "" ? badge.image : tempSvg}
          className="object-contain w-full h-14 mt-1"
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
