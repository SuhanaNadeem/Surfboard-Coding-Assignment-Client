import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import ChatCard from "./ChatCard";
import { GET_MESSAGES } from "../pages/Welcome";
import { useForm } from "../util/hooks";
import SendMessage from "./SendMessage";

export default function Chat({ props, messages }) {

  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit, setValues } = useForm(clearChatCallback);

  const [clearChat] = useMutation(CLEAR_CHAT, {
    refetchQueries: [
      {
        query: GET_MESSAGES,
      },
    ],
    update() {
      setErrors({});
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function clearChatCallback() {
    clearChat();
  }

  return messages ? (
    <div className="pt-8 w-full">
        <h4 className="text-3xl">Chat</h4>

        <div className="w-full pt-4 flex flex-col space-y-2 items-center justify-start py-4 mr-2 overflow-x-auto relative">
          {messages.map((message, index) => (
            <ChatCard key={index} props={props} message={message} />
          ))}
        </div>

        <SendMessage sender={""} text={""} props={props}/>
        
        <form onSubmit={onSubmit} className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-20">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold w-full"
          >
            Clear
          </button>
        </form>
    </div>
  ) : (
    <div></div>
  );
}


const CLEAR_CHAT = gql`
  mutation clearChat {
    clearChat
  }
`;
