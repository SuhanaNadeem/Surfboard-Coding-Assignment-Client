import React from "react";

import { useHistory } from "react-router-dom";

export default function DashboardSideBar({
  numOfQuestions,
  // numOfQuestionTemplates,
  numOfModules,
  numOfChallenges,
  numOfCategories,
  numOfBadges,
}) {
  const history = useHistory();

  return (
    <nav className="flex flex-shrink-0 items-start justify-start md:max-w-2xl xl:max-w-5xl border-gray-300 border-r-2 text-left flex-col md:static md:mt-6 md:w-1/6 my-2 w-full cursor-default z-20">
      <p className="mb-6 font-semibold text-sm uppercase tracking-wide ">
        Contributions
      </p>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        {numOfQuestions} {numOfQuestions === 1 ? `Question` : `Questions`}
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        {numOfModules} {numOfModules === 1 ? `Module` : `Modules`}
      </h3>
      {/* <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        {numOfQuestionTemplates}{" "}
        {numOfQuestionTemplates === 1
          ? `Question Template`
          : `Question Templates`}
      </h3> */}
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        {numOfBadges} {numOfBadges === 1 ? `Badge` : `Badges`}
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        {numOfCategories} {numOfCategories === 1 ? `Category` : `Categories`}
      </h3>
      <h3 className="hover:text-red-800 font-light mb-6 last:mb-0 focus:outline-none">
        {numOfChallenges} {numOfChallenges === 1 ? `Challenge` : `Challenges`}
      </h3>
    </nav>
  );
}
