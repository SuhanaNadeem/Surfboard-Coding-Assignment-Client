import React from "react";
import tempAboutImg from "../../images/try2.PNG";

export default function About() {
  return (
    <div className="flex flex-col items-center w-full justify-center mb-24">
      <h2 className="text-5xl text-center">About LYNX Institute</h2>
      <div className="mt-20 grid grid-flow-row xl:grid-flow-col w-full items-center justify-center h-full ">
        <h3 className="flex font-normal lg:font-light text-2xl h-full items-center justify-center xl:text-left text-center">
          LYNX Institute was created by a FRC 6378 team member to help train
          students in technical subteams from home amidst the COVID-19 pandemic.
          This is where new members will get trained during the pre-season, to
          then be able to effectively lead the team.
        </h3>
        <div className="flex items-center justify-center  pt-10 xl:pt-0 xl:pl-10 h-full">
          <img
            alt="LI About Graphic"
            src={tempAboutImg}
            className="w-full rounded-lg object-contain shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
