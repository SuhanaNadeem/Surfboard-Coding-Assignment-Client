import { gql, useQuery } from "@apollo/client";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import EditTopic from "./EditTopic";
import DeleteTopic from "./DeleteTopic";

export default function EditTopicCard({ props, topic }) {
  
  return topic ? (
    
      <div className="w-full bg-white flex-shrink-0 first:ml-2 shadow w-48  ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start">
        <div className="h-full justify-start items-start flex-col flex-1 mx-2 mb-2">
            <EditTopic topic={topic} props={props} />
            <DeleteTopic topic={topic} props={props} />
        </div>
      </div>
  ) : (
    <div></div>
  );
}