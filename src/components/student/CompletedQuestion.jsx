import { gql, useQuery } from "@apollo/client";
import React from "react";
import { CgCheckO, CgCloseO } from "react-icons/cg";
import { studentClient } from "../../GraphqlApolloClients";

export default function CompletedQuestion({
  props,
  completedQuestions,
  questionId,
}) {
  const { data: { getQuestionById: question } = {} } = useQuery(
    GET_QUESTION_BY_ID,
    {
      variables: { questionId: questionId },

      client: studentClient,
    }
  );

  return question && completedQuestions ? (
    <div className="flex items-center justify-start w-full overflow-hidden pb-2 ">
      <p className="text-md lg:text-sm font-normal lg:font-light text-red-800 leading-snug mr-2 md:w-3/4 truncate">
        {question.name}
      </p>
      {completedQuestions.includes(questionId) && (
        <CgCheckO size={16} className="md:w-1/4 flex-shrink-0" />
      )}
      {!completedQuestions.includes(questionId) && (
        <CgCloseO size={16} className="md:w-1/4 flex-shrink-0" />
      )}
    </div>
  ) : (
    <div></div>
  );
}

export const GET_QUESTION_BY_ID = gql`
  query getQuestionById($questionId: String!) {
    getQuestionById(questionId: $questionId) {
      id
      name
      description
      questionFormat
      image
      points
      moduleId
      type
      videoLink
      articleLink
      expectedAnswer
      hint
      extraLink
      optionA
      optionB
      optionC
      optionD
      createdAt
    }
  }
`;
