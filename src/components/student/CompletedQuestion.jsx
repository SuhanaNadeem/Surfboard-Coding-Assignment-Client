import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { CgCloseO, CgCheckO } from "react-icons/cg";

export default function CompletedQuestion({
  props,
  completedQuestions,
  questionId,
}) {
  const { student } = useContext(StudentAuthContext);

  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    getQuestionByIdError,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId: questionId },

    client: studentClient,
  });

  return question && completedQuestions ? (
    <div className="flex items-center justify-start w-full overflow-hidden pb-2 ">
      <p className="text-sm font-light text-red-800 leading-snug mr-2 md:w-3/4 truncate">
        {question.name}
      </p>
      {completedQuestions.includes(questionId) && (
        <CgCheckO size={16} className="md:w-1/4" />
      )}
      {!completedQuestions.includes(questionId) && (
        <CgCloseO size={16} className="md:w-1/4" />
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
