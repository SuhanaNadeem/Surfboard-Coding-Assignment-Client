import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";

export default function QuestionInputDropdown({
  onChange,
  errors,
  currentQuestionId,
  questionType,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  var questionErrors;
  if (questionType === "newQuestionId") {
    questionErrors = errors.newQuestionId;
  } else if (questionType === "questionId") {
    questionErrors = errors.questionId;
  }
  const {
    data: { getQuestions: questions } = {},
    loading: loadingQuestions,
  } = useQuery(GET_QUESTIONS, {
    client: adminClient,
  });

  const {
    data: { getQuestionById: currentQuestion } = {},
    loading: loadingQuestion,
    error,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId: currentQuestionId },
    client: adminClient,
  });
  console.log(currentQuestionId);
  console.log(currentQuestion);
  console.log(questionType);

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={`shadow text-left appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
          questionErrors ? "border-red-800" : ""
        }`}
      >
        {currentQuestion ? (
          <p>{currentQuestion.name}</p>
        ) : (
          <p className=" text-white">Unseen Text</p>
        )}
      </button>
      {isOpen && questions && questionType ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="absolute focus:outline-none left-50 w-1/4 mt-1 py-1 bg-white rounded-lg shadow-xl text-xs font-light z-20 max-h-32 overflow-y-auto">
            {questions.map((question, index) => (
              <button
                onClick={(e) => {
                  toggleIsOpen(e);
                  onChange(e);
                }}
                type="button"
                key={index}
                value={question.id}
                error={questionErrors ? "true" : "false"}
                name={questionType}
                className="focus:outline-none text-left font-light w-full block px-2 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              >
                {question.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export const GET_QUESTIONS = gql`
  {
    getQuestions {
      id
      name
      description
      image
      points
      moduleId
      type
      videoLink
      articleLink
      expectedAnswer
      hint
      createdAt
      optionA
      optionB
      optionC
      optionD
      extraLink
    }
  }
`;
