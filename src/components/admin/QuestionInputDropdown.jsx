import React, { useEffect, useState, useRef, useContext } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { MdPersonOutline } from "react-icons/md";

import { gql, useQuery } from "@apollo/client";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";

export default function QuestionInputDropdown({
  onChange,
  errors,
  currentQuestionId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
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
  console.log(currentQuestion);
  console.log(currentQuestionId);
  console.log(questions);

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={`shadow text-left appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
          errors.newQuestionId ? "border-red-500" : ""
        }`}
      >
        {currentQuestion ? (
          <p>{currentQuestion.questionName}</p>
        ) : (
          <p className=" text-white">Unseen Text</p>
        )}
      </button>
      {isOpen && questions ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="absolute focus:outline-none left-50 w-40 mt-1 py-1 bg-white rounded-lg shadow-xl text-xs font-light z-20">
            {questions.map((question, index) => (
              <button
                onClick={(e) => {
                  toggleIsOpen(e);
                  onChange(e);
                }}
                type="button"
                key={index}
                value={question.id}
                error={errors.newQuestionId ? "true" : "false"}
                name="newQuestionId"
                className="focus:outline-none text-left font-light w-full block px-2 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              >
                {question.questionName}
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
      questionName
      questionDescription
      image
      points
      moduleId
      type
      videoLink
      skillDescription
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
