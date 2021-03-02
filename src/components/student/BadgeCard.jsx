import React from "react";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
import tempSvg from "../../images/tempSvg.svg";

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
        <p className="font-thin text-xs w-20 truncate">
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
