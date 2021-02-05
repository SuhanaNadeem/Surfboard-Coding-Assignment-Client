import React from "react";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
export default function QuestionCard({ props, questionId }) {
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId: questionId },
    client: studentClient,
  });

  return question ? (
    <div className="bg-white w-96 align-middle flex flex-row items-center text-center m-4 p-4 rounded-md shadow-sm overflow-hidden h-32 justify-center hover:shadow-md ">
      <div className="flex flex-col mr-10">
        <p className=" font-semibold text-sm uppercase tracking-wide ">
          {question.type}
        </p>
        <p className="text-red-800">{question.questionName}</p>
        <p className="tracking-wider text-sm uppercase font-light ">
          {question.points} lynx tokens
        </p>
      </div>
      <button
        onClick={(e) => {
          console.log("go");
          // props.history.push(`/module/${module.id}`);
        }}
        className="flex border-2 border-red-800 px-4 py-2 text-red-800 rounded-lg transition-all duration-150 md:hover:-translate-y-1 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
      >
        START
      </button>
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
