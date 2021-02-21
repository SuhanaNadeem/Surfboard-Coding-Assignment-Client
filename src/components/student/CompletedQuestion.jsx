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
    <div className="flex mr-2 items-center justify-center pb-2">
      <p className="text-sm tracking-wide font-light text-red-800 leading-snug mr-2 ">
        {question.questionName}
      </p>
      {completedQuestions.includes(questionId) && <CgCheckO size={16} />}
      {!completedQuestions.includes(questionId) && <CgCloseO size={16} />}
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
