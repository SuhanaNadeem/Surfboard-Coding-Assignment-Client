import React from "react";
import { GrClose } from "react-icons/gr";
import robotics from "../../images/welcomeLogin.png";

export default function WelcomeModal({
  welcomeIsOpen,
  toggleWelcomeIsOpen,
  adminObject,
}) {
  return (
    welcomeIsOpen &&
    toggleWelcomeIsOpen &&
    adminObject && (
      <>
        <button
          tabIndex="-1"
          onClick={toggleWelcomeIsOpen}
          className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-30"
        ></button>
        <div className=" overscroll-contain overflow-y-auto fixed mx-2 md:mx-auto inset-0  max-w-2xl my-16 p-8 bg-white z-40 rounded-lg shadow-xl">
          <div className="justify-between flex flex-col h-full ">
            <div className="flex flex-col items-start justify-start overflow-y-auto ">
              <div className="w-full items-center justify-center flex flex-col">
                <h3 className="text-4xl text-red-800 text-center">
                  Welcome to LYNX Institute, {adminObject.name}!
                </h3>
                <div className="flex my-10 items-center  focus:outline-none justify-center w-full">
                  <img
                    alt="LYNX Logo Large"
                    src={robotics}
                    className="w-full"
                  />
                </div>
                <h3 className="w-full text-xl font-normal lg:font-light justify-center items-center text-center">
                  Hi there! Here's a quick rundown of the platform: you will be
                  able to create, edit, and delete modules, questions,
                  categories, badges, and challenges through your dashboard. You
                  will be able to see all the material created, as well as
                  material you have created. You can view students (with their
                  progress) and mentors on the platform through your users page,
                  and. Manage your account via your account page. Good luck on
                  your FRC and STEM journey! Please reach out to Suhana with any
                  issues or questions.
                </h3>
                <button
                  type="button"
                  onClick={toggleWelcomeIsOpen}
                  className="flex border-2 mt-8 mb-1 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm font-semibold focus:outline-none focus:ring"
                >
                  Get Started
                </button>
              </div>
            </div>
            <button
              className="mx-auto pt-4 focus:outline-none focus:ring rounded-sm"
              onClick={toggleWelcomeIsOpen}
              type="button"
            >
              <GrClose size={26} />
            </button>
          </div>
        </div>
      </>
    )
  );
}
