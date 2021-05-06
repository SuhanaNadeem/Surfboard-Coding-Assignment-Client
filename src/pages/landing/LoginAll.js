import React from "react";
import LandingTitleBar from "../../components/landing/TitleBar";
import robotics from "../../images/welcomeLogin.png";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPencilSquare, BsFillPeopleFill } from "react-icons/bs";
import Footer from "../../components/landing/Footer";
import ReactGA from "react-ga";
import { useEffect } from "react";

function LoginAll(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  return (
    <div className="h-full flex flex-col min-h-screen w-full">
      <LandingTitleBar />
      <div className="flex w-full flex-col mx-auto py-10 px-16 sm:px-24 md:px-16 md:flex-row">
        <div className="flex w-full lg:w-1/4 flex-col items-center justify-center ">
          <h3 className="text-3xl mb-6 font-normal uppercase lg:font-semibold">
            Login
          </h3>
          <div className="text-2xl lg:font-light font-normal mb-8">
            Welcome back to LYNX Institute! Log in below as an admin, mentor, or
            student.
          </div>
          <div className="flex items-center justify-center mx-auto flex-col">
            <a
              href={`${
                process.env.NODE_ENV === "production"
                  ? `https://lynxinstitute.com/loginAdmin`
                  : `/loginAdmin`
              }`}
              className="focus:outline-none rounded-lg focus:text-blue-500 w-full justify-start items-center flex "
            >
              <FaChalkboardTeacher
                size={32}
                className="text-red-800 flex-shrink-0"
              />
              <p className="text-2xl lg:text-xl uppercase font-semibold pl-3 ">
                Admin
              </p>
            </a>
            <a
              href={`${
                process.env.NODE_ENV === "production"
                  ? `https://lynxinstitute.com/loginMentor`
                  : `/loginMentor`
              }`}
              className="focus:outline-none rounded-lg focus:text-blue-500  py-8 w-full justify-start items-center flex "
            >
              <BsFillPeopleFill
                size={32}
                className="text-red-800 flex-shrink-0"
              />
              <p className="text-2xl lg:text-xl uppercase font-semibold pl-3 ">
                Mentors
              </p>
            </a>
            <a
              href={`${
                process.env.NODE_ENV === "production"
                  ? `https://lynxinstitute.com/login`
                  : `/login`
              }`}
              className="focus:outline-none rounded-lg focus:text-blue-500  w-full justify-start items-center flex "
            >
              <BsPencilSquare
                size={32}
                className="text-red-800 flex-shrink-0"
              />
              <p className="text-2xl lg:text-xl uppercase font-semibold pl-3 ">
                Students
              </p>
            </a>
          </div>
        </div>
        <div className="flex mt-10 md:m-0 items-center  focus:outline-none justify-end w-full lg:w-3/4">
          <img alt="LYNX Logo Large" src={robotics} className="w-full" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginAll;
