import { useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";
import EditAndPreviewQuestionModalCard from "./EditAndPreviewQuestionModalCard";

export default function EditAndPreviewQuestionModal({
  props,
  activeQuestionId,
  handleQuestionClick,
  isOpen,
  setIsOpen,
  moduleId,
}) {
  function toggleIsOpen() {
    handleQuestionClick("");
    setIsOpen(false);
  }
  const { data: { getQuestionById: question } = {} } = useQuery(
    GET_QUESTION_BY_ID,
    {
      variables: { questionId: activeQuestionId },
      client: adminClient,
    }
  );
  return isOpen && question ? (
    <>
      <button
        tabIndex="-1"
        onClick={toggleIsOpen}
        className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
      ></button>

      <div className="fixed mx-auto inset-0 overscroll-contain max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
        <EditAndPreviewQuestionModalCard
          props={props}
          questionId={activeQuestionId}
          moduleId={moduleId}
          handleQuestionClick={handleQuestionClick}
          toggleQuesCard={toggleIsOpen}
        />
      </div>
    </>
  ) : (
    <></>
  );
}
