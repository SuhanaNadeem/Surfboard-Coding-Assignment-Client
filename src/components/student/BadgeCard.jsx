import React from "react";

export default function BadgeCard({ props, badge }) {
  return badge ? (
    <div>
      <div className=" text-white  bg-black flex-shrink-0 first:ml-2 shadow w-24 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-lg hover:bg-white h-full justify-start hover:text-black">
        {/* <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {badge.name}
        </p> */}
        <p className="font-semibold text-xs leading-tight w-20 truncate">
          {badge.name}
        </p>
        {badge.type === "Module" && badge.requiredAmount > 1 && (
          <p className="font-normal lg:font-light text-xs w-20 truncate">
            {badge.requiredAmount} Modules
          </p>
        )}
        {badge.type === "Question" && badge.requiredAmount > 1 && (
          <p className="font-normal lg:font-light text-xs w-20 truncate">
            {badge.requiredAmount} Questions
          </p>
        )}
        {badge.type === "Module" && badge.requiredAmount === 1 && (
          <p className="font-normal lg:font-light text-xs w-20 truncate">
            {badge.requiredAmount} Module
          </p>
        )}
        {badge.type === "Question" && badge.requiredAmount === 1 && (
          <p className="font-normal lg:font-light text-xs w-20 truncate">
            {badge.requiredAmount} Question
          </p>
        )}
        <img
          alt="Badge Icon"
          src={
            badge.image && badge.image !== ""
              ? badge.image
              : "https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
          }
          className="object-contain w-full h-14 mt-1"
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
