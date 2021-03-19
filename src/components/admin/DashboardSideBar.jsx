import React from "react";

export default function DashboardSideBar({
  numOfQuestions,
  // numOfQuestionTemplates,
  numOfModules,
  numOfChallenges,
  numOfCategories,
  numOfBadges,
}) {
  return (
    <nav className="flex flex-shrink-0 items-start sm:items-center md:items-start justify-start md:max-w-2xl xl:max-w-5xl border-gray-300 pb-2 md:pb-0 border-b-2 md:border-r-2 md:border-b-0 text-left flex-col sm:flex-row md:flex-col md:static md:mt-6 md:w-1/6 my-4 sm:my-3 md:my-2 w-full cursor-default z-20 sm:space-x-4 md:space-x-0 overflow-x-auto">
      <p className="mb-3 md:mb-6 font-semibold md:text-sm text-md truncate md:w-full uppercase tracking-wide pr-0 sm:pr-2">
        Contributions
      </p>
      <h3 className="hover:text-red-800 font-normal lg:font-light mb-3 md:mb-6 w-full sm:w-1/6 md:w-full truncate focus:outline-none text-md">
        {numOfQuestions} {numOfQuestions === 1 ? `Question` : `Questions`}
      </h3>
      <h3 className="hover:text-red-800 font-normal lg:font-light mb-3 md:mb-6 w-full sm:w-1/6 md:w-full truncate focus:outline-none text-md">
        {numOfModules} {numOfModules === 1 ? `Module` : `Modules`}
      </h3>
      {/* <h3 className="hover:text-red-800 font-normal lg:font-light mb-3 md:mb-6 w-full sm:w-1/6 md:w-full truncate focus:outline-none text-md">
        {numOfQuestionTemplates}{" "}
        {numOfQuestionTemplates === 1
          ? `Question Template`
          : `Question Templates`}
      </h3> */}
      <h3 className="hover:text-red-800 font-normal lg:font-light mb-3 md:mb-6 w-full sm:w-1/6 md:w-full truncate focus:outline-none text-md">
        {numOfBadges} {numOfBadges === 1 ? `Badge` : `Badges`}
      </h3>
      <h3 className="hover:text-red-800 font-normal lg:font-light mb-3 md:mb-6 w-full sm:w-1/6 md:w-full truncate focus:outline-none text-md">
        {numOfCategories} {numOfCategories === 1 ? `Category` : `Categories`}
      </h3>
      <h3 className="hover:text-red-800 font-normal lg:font-light mb-3 md:mb-6 w-full sm:w-1/6 md:w-full truncate focus:outline-none text-md">
        {numOfChallenges} {numOfChallenges === 1 ? `Challenge` : `Challenges`}
      </h3>
    </nav>
  );
}
