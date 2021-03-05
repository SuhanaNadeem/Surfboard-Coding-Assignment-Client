import React from "react";

import BadgeCard from "./BadgeCard";

export default function DashboardBadges({ props, badges }) {
  console.log(badges);
  return badges ? (
    <div className="w-full">
      <div className="grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
        {badges.map((badge, index) => (
          <BadgeCard key={index} props={props} badge={badge} />
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
