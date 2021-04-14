import React from "react";
import educator from "../../images/educator.png";
import mentor from "../../images/mentor.png";
import learner from "../../images/learner.png";

export default function Features() {
  return (
    <div className="flex flex-col items-center w-full justify-center mb-24  text-center">
      <h2 className="text-5xl mt-24 md:mt-0 mb-20 lg:mt-12">How It Works</h2>
      <div className="grid grid-flow-row lg:grid-flow-col w-full items-start justify-start gap-12">
        <div className=" flex flex-col items-center justify-center">
          <img src={educator} alt="educator icon" className="w-16 mx-auto" />
          <h2 className="text-2xl font-semibold uppercase mt-6 mb-3 text-red-800">
            Admin
          </h2>
          <h4 className="text-2xl font-normal lg:font-light">
            Admin create custom modules for different subteams, including
            assessments and skills, through a dynamic, easy-to-navigate
            interface.
          </h4>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <img src={mentor} alt="mentor icon" className="w-16 mx-auto" />
          <h2 className="text-2xl font-semibold uppercase mt-6 mb-3 text-red-800">
            Mentors
          </h2>
          <h4 className="text-2xl font-normal lg:font-light">
            Mentors connect with students to track and promote their progress,
            using their Institute performance statistics.
          </h4>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <img src={learner} alt="learner icon" className="w-16 mx-auto" />
          <h2 className="text-2xl font-semibold uppercase mt-6 mb-3 text-red-800">
            Students
          </h2>
          <h4 className="text-2xl font-normal lg:font-light">
            Students complete admin-created modules by watching videos, reading
            articles, and answering questions, earning points to unlock badges.
          </h4>
        </div>
      </div>
    </div>
  );
}
