import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { GET_STUDENT_BY_ID } from "./ModuleSummaryBar";

function QuestionCard({
  props,
  questionId,
  complete,
  handleQuestionClick,
  studentId,
  setIsOpen,
}) {
  const { data: { getQuestionById: question } = {} } = useQuery(
    GET_QUESTION_BY_ID,
    {
      variables: { questionId },
      client: studentClient,
    }
  );
  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId },
      client: studentClient,
    }
  );

  const { values, onSubmit } = useForm(startQuestionCallback, {
    questionId,
    studentId,
  });

  const [startQuestion] = useMutation(START_QUESTION, {
    client: studentClient,
    refetchQueries: [],

    update() {
      setIsOpen(true);
      handleQuestionClick(questionId);
    },
    // onError(err) {
    //   // console.log(err);
    //   // console.log(err.graphQLErrors[0].extensions.exception.errors);
    // },
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
          ? "bg-gray-100 w-72 md:w-96 align-middle flex flex-row items-center text-center p-4 rounded-md shadow-sm overflow-hidden h-32 justify-center hover:shadow-md "
          : "bg-white w-72 md:w-96 align-middle flex flex-row items-center text-center p-4 rounded-md shadow-sm overflow-hidden h-32 justify-center hover:shadow-md "
      }`}
    >
      <div className="flex flex-col mr-10">
        <div className="flex items-center justify-center">
          <p className=" font-semibold text-sm w-32 md:w-52 uppercase tracking-wide ">
            {question.type}
          </p>
          {studentObject &&
            studentObject.starredQuestions.includes(questionId) && (
              <BsStarFill size={20} className="pl-2" />
            )}
        </div>
        <p className="text-red-800 w-32 md:w-52 truncate">{question.name}</p>
        <p className="tracking-wider text-md lg:text-sm uppercase lg:font-light w-32 md:w-52 font-normal truncate ">
          {question.points} lynx tokens
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold focus:outline-none focus:ring"
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
export default QuestionCard;
