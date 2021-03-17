import React from "react";
import { BiLock } from "react-icons/bi";

export default function DashboardSideBar({ props }) {
  const pageLinksAndTitles = [
    { title: "Progress", link: "/studentAccount" },
    { title: "Mentors", link: "/studentAccount" },
    { title: "Badges", link: "/studentAccount" },

    // { title: "Challenges", link: "/dashboard" },
  ];

  return (
    <nav className="flex md:flex-shrink-0 items-center md:items-start justify-start md:max-w-2xl xl:max-w-5xl border-gray-300 border-b-2 md:border-b-0 md:border-r-2 text-left md:flex-col static md:mt-6 md:w-1/6 my-2 w-full cursor-default z-20 mb-2 md:mb-0  pb-3 md:pb-none md:pr-2 overflow-x-hidden">
      <p className="md:mb-6 mr-4 md:mr-0 font-semibold text-sm uppercase tracking-wide ">
        Your Account
      </p>
      {pageLinksAndTitles.map((pageInfo) => (
        <button
          key={pageInfo.title}
          onClick={(e) => {
            e.preventDefault();
            props.history.push(pageInfo.link);
          }}
          className="hover:text-red-800 mr-2 md:mr-0 font-normal lg:font-light md:mb-6 last:mb-0 focus:outline-none "
        >
          {pageInfo.title}
        </button>
      ))}
      <button
        className=" cursor-auto hover:text-red-800 font-normal lg:font-light md:mb-6 focus:outline-none flex items-center justify-center"
        disabled
      >
        <p className="mr-2">Challenges</p>
        <BiLock size={16} className="block md:hidden lg:block" />
      </button>
    </nav>
  );
}
