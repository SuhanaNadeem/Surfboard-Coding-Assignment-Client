import React from "react";
import robotics from "../../images/welcomeLogin.png";

export default function WelcomeModal({
  welcomeIsOpen,
  toggleWelcomeIsOpen,
  mentorObject,
}) {
  return (
    welcomeIsOpen &&
    toggleWelcomeIsOpen &&
    mentorObject && (
      <>
        <button
          tabIndex="-1"
          onClick={toggleWelcomeIsOpen}
          className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
        ></button>
        <div className=" overscroll-contain overflow-y-auto fixed mx-2 md:mx-auto inset-0  max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
          <div className="justify-between flex flex-col h-full ">
            <div className="flex flex-col items-start justify-start overflow-y-auto ">
              <div className="w-full items-center justify-center flex flex-col">
                <h3 className="text-3xl text-red-800">
                  Welcome to LYNX Institute, {mentorObject.name}!
                </h3>
                <div className="flex my-10 items-center  focus:outline-none justify-center w-full">
                  <img
                    alt="LYNX Logo Large"
                    src={robotics}
                    className="w-full"
                  />
                </div>
                <h3 className="w-full text-xl font-normal lg:font-light justify-center items-center text-center">
                  Hi there! First off, thank you for mentoring students in FRC
                  and STEM in general. Here's a quick rundown of the platform:
                  you will be able to view the students registered with your
                  team, {mentorObject.orgName} through your dashboard page. More
                  features (i.e. analytics) are in the works, so stay tuned.
                  able to create, edit, and delete modules, questions, Manage
                  your account via your account page. Good luck, and please
                  reach out to Suhana with any issues or questions.
                </h3>
                <button
                  type="button"
                  onClick={toggleWelcomeIsOpen}
                  className="flex border-2 mt-8 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm font-semibold focus:outline-none focus:ring"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
