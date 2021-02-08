import React, { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import QuestionModal from "./QuestionModal";
export default function QuestionCard({
  props,
  questionId,
  complete,
  num,
  parsedActiveQuestionId,
  moduleId,
}) {
  const [activeQuestionId, setActiveQuestionId] = useState(
    parsedActiveQuestionId
  );
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
    refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: studentClient,
  });
  function handleQuestionClick(selectedQuestionId) {
    if (selectedQuestionId) {
      setActiveQuestionId(selectedQuestionId);
      console.log("hihi");
      refetchQuestion({ questionId: selectedQuestionId });

      props.history.push("/module/" + moduleId + "/" + questionId);
    } else {
      setActiveQuestionId("");
      props.history.push("/module/" + moduleId);
    }
  }
  // if (questionId) {
  //   refetchQuestion();
  // }
  // useEffect(() => {
  //   console.log(activeQuestionId);
  //   refetchQuestion({ questionId: activeQuestionId });
  // }, [activeQuestionId]);

  return question ? (
    <div
      className={`${
        complete
          ? "bg-gray-100 w-96 align-middle flex flex-row items-center text-center p-4 rounded-md shadow-sm overflow-hidden h-32 justify-center hover:shadow-md "
          : "bg-white w-96 align-middle flex flex-row items-center text-center p-4 rounded-md shadow-sm overflow-hidden h-32 justify-center hover:shadow-md "
      }`}
    >
      <div className="flex flex-col mr-10">
        <p className=" font-semibold text-sm uppercase tracking-wide ">
          {question.type}
        </p>
        <p className="text-red-800">{question.questionName}</p>
        <p className="tracking-wider text-sm uppercase font-light ">
          {question.points} lynx tokens
        </p>
      </div>
      <QuestionModal
        props={props}
        question={question}
        complete={complete}
        num={num}
        handleQuestionClick={handleQuestionClick}
        isActiveQuestion={questionId === activeQuestionId}
      />
    </div>
  ) : (
    <div></div>
  );
}
export const GET_QUESTION_BY_ID = gql`
  query getQuestionById($questionId: String!) {
    getQuestionById(questionId: $questionId) {
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
    }
  }
`;
