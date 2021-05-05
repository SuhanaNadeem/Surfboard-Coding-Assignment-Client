import React from "react";
import BadgeCard from "./BadgeCard";

export default function DashboardBadges({ props, badges }) {
  return badges && badges.length !== 0 ? (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 relative">
        {badges.map((badge, index) => (
          <BadgeCard key={index} props={props} badge={badge} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center text-white text-md font-normal lg:font-light ">
      Complete questions and modules to see badges here.
    </div>
  );
}
