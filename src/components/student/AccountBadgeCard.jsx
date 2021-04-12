import React from "react";

export default function AccountBadgeCard({ props, badge, earned }) {
  return badge ? (
    <div>
      <div
        className={`${
          earned ? `bg-gray-200` : `bg-white`
        }  h-full flex-shrink-0 first:ml-2 shadow w-40  ease-in-out lg:text-sm font-semibold md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden `}
      >
        <p className="text-red-800 uppercase font-sm leading-tight w-32 truncate">
          {badge.name}
        </p>
        <p className="font-light my-1 w-32">{badge.description}</p>
        <p className="w-32 truncate">
          {badge.requiredAmount}{" "}
          {`${
            badge.type === "Question"
              ? badge.requiredAmount === 1
                ? `Question`
                : badge.type === "Question" && `Questions`
              : badge.type === "Module" && badge.requiredAmount === 1
              ? `Module`
              : badge.type === "Module" && `Modules`
          }`}
        </p>
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
