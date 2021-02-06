import React from "react";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import QuestionModal from "./QuestionModal";
export default function QuestionCard({ props, questionId, complete }) {
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId: questionId },
    client: studentClient,
  });
  console.log(complete);

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
      <QuestionModal props={props} question={question} complete={complete} />
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
