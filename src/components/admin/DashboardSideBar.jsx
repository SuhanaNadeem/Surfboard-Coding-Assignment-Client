import React from "react";

import { useHistory } from "react-router-dom";

export default function DashboardSideBar(props) {
  const history = useHistory();

  return (
    <nav className="flex flex-shrink-0 items-start justify-start md:max-w-2xl xl:max-w-5xl border-gray-300 border-r-2 text-left flex-col md:static md:mt-6 md:w-1/6 my-2 w-full cursor-default z-20">
      <p className="mb-6 font-semibold text-sm uppercase tracking-wide ">
        Contributions
      </p>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        _ Questions
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        _ Modules
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        _ Question Templates
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        _ Badges
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        _ Categories
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        _ Challenges
      </h3>
    </nav>
  );
}
