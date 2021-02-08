import React, { useContext, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
import { GET_COMPLETED_QUESTIONS_BY_MODULE } from "../../pages/student/StudentModule";

import QuestionModalCard from "./QuestionModalCard";

export default function QuestionModal({
  props,
  question,
  complete,
  num,
  isActiveQuestion,
  handleQuestionClick,
}) {
  const { student } = useContext(StudentAuthContext);
  const studentId = student.id;
  const questionId = question.id;
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(isActiveQuestion);

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

  function toggleIsOpen() {
    handleQuestionClick("");
    setIsOpen(!isOpen);
  }
  // if (isActiveQuestion) {
  //   startQuestion();
  // }
  return (
    <>
      <form onSubmit={onSubmit}>
        <button
          type="submit"
          className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
        >
          {`${complete ? "revisit" : "start"}`}
        </button>
      </form>

      {isOpen && !loading && errors ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
          ></button>

          <div className="fixed mx-auto overflow-auto inset-0 overflow-y-auto overscroll-contain max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl ">
            <QuestionModalCard
              props={props}
              question={question}
              answer=""
              complete={complete}
              num={num}
              handleQuestionClick={handleQuestionClick}
            />
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
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
