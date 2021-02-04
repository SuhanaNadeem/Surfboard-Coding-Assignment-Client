import React from "react";

import { GiMorphBall } from "react-icons/gi";
import { BsCodeSlash } from "react-icons/bs";
import { RiWirelessChargingLine } from "react-icons/ri";
import { GrPersonalComputer } from "react-icons/gr";

export default function NewModuleCard({ props, categoryName, moduleInfo }) {
  return categoryName && moduleInfo && props ? (
    <button
      onClick={(e) => {
        console.log(moduleInfo.id);
        console.log(props);
        props.history.push(`/module/${moduleInfo.id}`);
        // startModule
        // addInProgressModule
      }}
    >
      <div className="flex flex-row items-center justify-start">
        {categoryName === "Programming" && <BsCodeSlash size={32} />}
        {categoryName === "Electrical" && <RiWirelessChargingLine size={32} />}
        {categoryName === "Computer-Aided Design" && (
          <GrPersonalComputer size={32} />
        )}

        {categoryName !== "Programming" &&
          categoryName !== "Electrical" &&
          categoryName !== "Computer-Aided Design" && <GiMorphBall size={32} />}

        <p className="ml-6 tracking-wide font-thin my-4 text-md">
          {moduleInfo.name}
        </p>
      </div>
    </button>
  ) : (
    <div></div>
  );
}
