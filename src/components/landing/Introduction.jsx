import React from "react";
import welcomeImg from "../../images/WGradient.png";

export default function Introduction() {
  return (
    <div className="flex sm:flex-row flex-col items-center w-full min-h-screen mt-6 sm:mt-0 justify-center">
      <div className="flex w-full md:w-1/2 items-center justify-center flex-shrink-0 mb-8 md:mb-0 md:mr-8 mt-4 md:mt-0">
        <img alt="Welcome LI Graphic" src={welcomeImg} className="w-full" />
      </div>
      <div className="flex w-full md:w-1/2 flex-col text-center md:text-left">
        <h2 className="text-5xl leading-normal">
          FRC Team 6378 LYNX Training Platform
        </h2>
        <h6 className="text-2xl font-normal lg:font-light mt-5 mb-10">
          Learn technical skills to prepare yourself for the FIRST Robotics
          Competition, guided by your own team members and mentors. New users,
          sign up below:
        </h6>
        <div className="flex w-full md:flex-row flex-col items-center justify-center md:items-start md:justify-start">
          <a
            href={`${
              process.env.NODE_ENV === "production"
                ? `https://lynxinstitute.com/signupAdmin`
                : `/signupAdmin`
            }`}
            rel="noopener noreferrer"
            className=" w-full md:w-1/3 border-2 border-red-800 px-2 md:px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-lg md:text-md font-semibold text-center items-center justify-center flex focus:outline-none focus:ring "
          >
            Admin
          </a>
          <a
            href={`${
              process.env.NODE_ENV === "production"
                ? `https://lynxinstitute.com/signupMentor`
                : `/signupMentor`
            }`}
            className="md:mx-4 my-4 md:my-0 w-full md:w-1/3 border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-lg md:text-md font-semibold text-center items-center justify-center flex focus:outline-none focus:ring "
          >
            Mentors
          </a>
          <a
            href={`${
              process.env.NODE_ENV === "production"
                ? `https://lynxinstitute.com/signup`
                : `/signup`
            }`}
            className=" w-full md:w-1/3 border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-lg md:text-md font-semibold text-center items-center justify-center flex focus:outline-none focus:ring "
          >
            Students
          </a>
        </div>
      </div>
    </div>
  );
}
