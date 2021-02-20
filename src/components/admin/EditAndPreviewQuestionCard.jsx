import React from "react";

import { gql, useQuery } from "@apollo/client";
import { adminClient } from "../../GraphqlApolloClients";
function EditAndPreviewQuestionCard({
  props,
  questionId,
  handleQuestionClick,
  setIsOpen,
}) {
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
    // refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: adminClient,
  });

  function onAdminClick() {
    // setIsOpen(true);
    handleQuestionClick(questionId);
  }

  // console.log(question);
  return question ? (
    <div className="bg-white w-96 align-middle flex flex-row items-center text-center p-4 rounded-md shadow-sm overflow-hidden h-32 justify-center hover:shadow-md ">
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
        onClick={onAdminClick}
        className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
      >
        VIEW
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
export default EditAndPreviewQuestionCard;
