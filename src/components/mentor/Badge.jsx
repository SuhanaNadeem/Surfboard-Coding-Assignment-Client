import React from "react";
import { BiAward } from "react-icons/bi";

function Badge({ badge }) {
  return badge ? (
    <div className="flex items-start justify-start mb-2">
      <BiAward size={24} className="flex-shrink-0" />
      <div className="flex flex-col items-start justify-start ml-1">
        <h3 className="font-semibold text-sm uppercase">{badge.name}</h3>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Badge;
