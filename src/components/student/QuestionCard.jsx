import React, { useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import QuestionModal from "./QuestionModal";
import { useForm } from "../../util/hooks";
function QuestionCard({
  props,
  questionId,
  complete,
  activeQuestionId,
  handleQuestionClick,
  studentId,
  setIsOpen,
  isOpen,
}) {
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
    // refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: studentClient,
  });

  const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(startQuestionCallback, {
    questionId,
    studentId,
  });

  const [startQuestion, { loading }] = useMutation(START_QUESTION, {
    client: studentClient,
    refetchQueries: [],

    update(proxy, { data: { startQuestion: startQuestionData } }) {
      setIsOpen(true);

      values.confirmTitle = "";
      setErrors({});
      handleQuestionClick(questionId);
    },
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function startQuestionCallback() {
    startQuestion();
  }

  // console.log(question);
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
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
        >
          {`${complete ? "revisit" : "start"}`}
        </button>
      </form>
    </div>
  ) : (
    <div></div>
  );
}

export const START_QUESTION = gql`
  mutation startQuestion($questionId: String!, $studentId: String!) {
    startQuestion(questionId: $questionId, studentId: $studentId) {
      key
      value
      studentId
      id
    }
  }
`;

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
export default QuestionCard;
