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
  console.log(question);

  return question ? (
    <button
      onClick={(e) => {
        console.log("go");
        // props.history.push(`/module/${module.id}`);
      }}
    >
      <div className="bg-white w-full transition-all duration-150 md:hover:-translate-y-1 align-middle flex flex-col items-center text-center m-4 p-4 rounded-md shadow-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-32 justify-center ">
        <p className=" font-semibold text-sm uppercase tracking-wide ">
          {question.type}
        </p>
        <p className="text-red-800">{question.questionName}</p>
        <p className="tracking-wider text-sm uppercase font-light ">
          {question.points} lynx tokens
        </p>
      </div>
    </button>
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
