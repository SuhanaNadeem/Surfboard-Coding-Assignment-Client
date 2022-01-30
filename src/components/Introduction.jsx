import React from "react";
import welcomeImg from "../images/test.png";

export default function Introduction(props) {
  
  return (
    <div className="flex md:flex-row flex-col items-center w-full min-h-screen mt-6 sm:mt-0 justify-center">
      <div className="flex w-full md:w-1/2 items-center justify-center flex-shrink-0 md:mr-8 my-8 md:my-0">
        <img alt="Welcome LI Graphic" src={welcomeImg} className="w-full" />
      </div>
      <div className="flex w-full md:w-1/2 flex-col text-center md:text-left">
        <h2 className="text-5xl leading-12">
          Agenda-Track
        </h2>
        <h6 className="text-2xl font-normal lg:font-light mt-5 mb-10">
          A coding assignment for Surfboard which allows users to keep track of agendas for investor meetings. Seamlessly add, edit, and remove meeting topics with an easy-to-use platform where participants can also communicate during the meeting.
        </h6>
        
      </div>
    </div>
  );
}
