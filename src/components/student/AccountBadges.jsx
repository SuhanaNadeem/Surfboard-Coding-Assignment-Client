import React from "react";
import AccountBadgeCard from "./AccountBadgeCard";
export default function AccountBadges({ props, allBadges, studentBadges }) {
  return allBadges && studentBadges ? (
    <>
      <h4 className=" text-3xl mr-2 w-11/12 text-black">Badges</h4>

      <div className="w-full pt-4  grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
        {allBadges.map((badge, index) => (
          <AccountBadgeCard
            key={index}
            props={props}
            badge={badge}
            earned={studentBadges.some(
              (studentBadge) => studentBadge.id === badge.id
            )}
          />
        ))}
      </div>
    </>
  ) : (
    <></>
  );
}
