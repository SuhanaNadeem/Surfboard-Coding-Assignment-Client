import { gql, useQuery } from "@apollo/client";
import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function ChatCard({ props, message }) {

  return message ? (
    
      <div className="w-full justify-between ease-in-out align-middle flex items-center text-center py-2 rounded-md overflow-hidden justify-start">
        <p className="tracking-wide text-red-800 font-normal text-md">
          {message.sender}
        </p>
        <p className="py-2 bg-white shadow-md font-normal lg:font-light text-md font-thin rounded-full leading-tight px-4">
          {message.text}
        </p>
      </div>
  ) : (
    <div></div>
  );
}