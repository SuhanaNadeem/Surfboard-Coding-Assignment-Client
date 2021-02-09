import React, { useContext, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
import { GET_COMPLETED_QUESTIONS_BY_MODULE } from "../../pages/student/StudentModule";

import QuestionModalCard from "./QuestionModalCard";

export default function QuestionModal({
  props,
  question,
  complete,
  activeQuestionId,
  handleQuestionClick,
  isOpen,
  setIsOpen,
  moduleId,
}) {
  const { student } = useContext(StudentAuthContext);
  console.log(activeQuestionId);
  function toggleIsOpen() {
    console.log("enters");
    handleQuestionClick("");
    setIsOpen(false);
  }
  // if (isActiveQuestion) {
  //   startQuestion();
  // }
  return (
    isOpen && (
      <>
        <button
          tabIndex="-1"
          onClick={toggleIsOpen}
          className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
        ></button>

        <div className="fixed mx-auto inset-0 overscroll-contain max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
          <QuestionModalCard
            props={props}
            questionId={activeQuestionId}
            answer=""
            complete={complete}
            moduleId={moduleId}
            handleQuestionClick={handleQuestionClick}
          />
        </div>
      </>
    )
  );
}
