import React, { useContext, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import QuestionModalCard from "./QuestionModalCard";

export default function QuestionModal({
  props,
  activeQuestionId,
  handleQuestionClick,
  isOpen,
  setIsOpen,
  moduleId,
  initialPoints,
  completedQuestions,
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
  return (
    isOpen && (
      <>
        <button
          tabIndex="-1"
          onClick={toggleIsOpen}
          className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
        ></button>

        <div className="fixed mx-4 md:mx-auto inset-0 overscroll-contain md:max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
          <QuestionModalCard
            props={props}
            questionId={activeQuestionId}
            answer=""
            moduleId={moduleId}
            initialPoints={initialPoints}
            handleQuestionClick={handleQuestionClick}
            toggleQuesCard={toggleIsOpen}
          />
        </div>
      </>
    )
  );
}
