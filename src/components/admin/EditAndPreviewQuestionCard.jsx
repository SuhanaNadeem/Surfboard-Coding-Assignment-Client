import { gql, useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";

function EditAndPreviewQuestionCard({
  props,
  questionId,
  handleQuestionClick,
  setIsOpen,
}) {
  const {
    data: { getQuestionById: question } = {},

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
    <div className="bg-gray-100 w-full align-middle flex flex-col lg:flex-row items-center text-center p-4 rounded-md shadow-sm overflow-hidden h-full lg:h-32 justify-center hover:shadow-md  ">
      <div className="flex flex-col items-center justify-center mb-4 lg:mb-0 w-full lg:w-48 lg:pr-4 ">
        <p className="  font-semibold text-sm w-full  uppercase tracking-wide ">
          {`${question.type === "Skill" ? `Skill` : `Assessment`}`}
        </p>
        <p className="text-red-800 w-full my-1 leading-tight">
          {question.name}
        </p>
        <p className="tracking-wider text-md lg:text-sm uppercase lg:font-light">
          {question.points} lynx tokens
        </p>
      </div>
      <button
        onClick={onAdminClick}
        className="focus:outline-none focus:ring flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
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
      adminId
      hint
      createdAt
      extraLink
      optionA
      optionB
      optionC
      optionD
    }
  }
`;
export default EditAndPreviewQuestionCard;
