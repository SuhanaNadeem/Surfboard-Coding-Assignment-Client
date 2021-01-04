import React from "react";

import { useHistory } from "react-router-dom";

export default function DashboardNavBar(props) {
  const history = useHistory();

  const pageLinksAndTitles = [
    { title: "Statistics", link: "/dashboard" },
    { title: "Badges", link: "/dashboard" },
    { title: "Mentors", link: "/dashboard" },

    { title: "Challenges", link: "/dashboard" },
  ];

  return (
    <nav className="flex flex-shrink-0 items-start justify-start md:max-w-2xl xl:max-w-5xl border-gray-300 border-r-2 z-10 text-left flex-col font-light text-md text-black py-6 pr-10">
      <p className="mb-6 font-semibold text-sm uppercase tracking-wide ">
        My Account
      </p>
      {pageLinksAndTitles.map((pageInfo) => (
        <button
          key={pageInfo.title}
          onClick={(e) => {
            e.preventDefault();
            history.push(pageInfo.link);
          }}
          className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none"
        >
          {pageInfo.title}
        </button>
      ))}
    </nav>
  );
}