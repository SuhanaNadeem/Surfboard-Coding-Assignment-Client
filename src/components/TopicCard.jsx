import { gql, useQuery } from "@apollo/client";
import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function TopicCard({ props, topic }) {
  

  return topic ? (
    
      <div className="w-full px-8 bg-white flex-shrink-0 first:ml-2 shadow ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-full ">
          {topic.title}
        </p>
        <p className="pb-1 text-gray-700 py-2 text-md leading-tight  w-full ">
          {topic.description}
        </p>
        <div className="flex items-center justify-center">
          <p className="  text-gray-700 font-thin text-lg">
            {topic.timeEstimate} Minutes
          </p>
        </div>
        <img
          alt="Topic Icon"
          src={
            topic.imageLink && topic.imageLink !== ""
              ? topic.imageLink
              : "https://uspto.report/TM/90576838/mark.png"
          }
          className={`${
            topic.imageLink && topic.imageLink !== ""
              ? `object-cover`
              : `object-contain`
          } w-full h-32 rounded-lg overflow-hidden m-2`}
        />
        {/* <div className="h-full justify-start items-start flex flex-1 lg:mx-48 mx-12 mb-2">
            <EditTopic topic={topic} props={props} />
        </div> */}
      </div>
  ) : (
    <div></div>
  );
}