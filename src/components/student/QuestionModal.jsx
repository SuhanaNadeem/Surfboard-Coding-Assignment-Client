import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import { GET_QUESTION_BY_ID } from "./CompletedQuestion";

import QuestionModalCard from "./QuestionModalCard";

export default function QuestionModal({
  props,
  activeQuestionId,
  handleQuestionClick,
  isOpen,
  setIsOpen,
  moduleId,
  initialPoints,
}) {
  const { student } = useContext(StudentAuthContext);
  // console.log(activeQuestionId);
  function toggleIsOpen() {
    // console.log("enters");
    handleQuestionClick("");
    setIsOpen(false);
  }
  // if (isActiveQuestion) {
  //   startQuestion();
  // }
  // const { data: { getQuestionById: question } = {} } = useQuery(
  //   GET_QUESTION_BY_ID,
  //   {
  //     variables: { questionId: activeQuestionId },
  //     client: studentClient,
  //   }
  // );
  return (
    isOpen && (
      <>
        <button
          tabIndex="-1"
          onClick={toggleIsOpen}
          className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
        ></button>
        <div className="fixed mx-2 md:mx-auto inset-0 overscroll-contain overflow-y-auto max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
          <QuestionModalCard
            props={props}
            questionId={activeQuestionId}
            answer=""
            moduleId={moduleId}
            handleQuestionClick={handleQuestionClick}
          />
        </div>
      </>
    )
  );
}
