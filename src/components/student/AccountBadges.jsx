import React from "react";
import AccountBadgeCard from "./AccountBadgeCard";
export default function AccountBadges({ props, allBadges, studentBadges }) {
  return allBadges && studentBadges ? (
    <>
      <h4 className=" text-3xl mr-2 w-11/12 text-black">Badges</h4>
      <p className="font-light text-left w-full text-sm mt-2">
        All badges are shown here, with the ones you've earned highlighted in
        gray.
      </p>
      <div className="w-full pt-4  grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
        {allBadges.length > 0 ? (
          allBadges.map((badge, index) => (
            <AccountBadgeCard
              key={index}
              props={props}
              badge={badge}
              earned={studentBadges.some(
                (studentBadge) => studentBadge.id === badge.id
              )}
            />
          ))
        ) : (
          <p className="font-light text-left w-full text-sm">
            Available badges will appear here.
          </p>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}
