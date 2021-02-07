import React, { useContext, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
import { GET_COMPLETED_QUESTIONS_BY_MODULE } from "../../pages/student/StudentModule";

import QuestionModalCard from "./QuestionModalCard";

export default function QuestionModal({ props, question, complete }) {
  const { student } = useContext(StudentAuthContext);
  const studentId = student.id;
  const moduleId = question.moduleId;

  const questionId = question.id;
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { values, onChange, onSubmit, onArrayChange } = useForm(
    startQuestionCallback,
    {
      questionId,
      studentId,
    }
  );

  const [startQuestion, { loading }] = useMutation(START_QUESTION, {
    client: studentClient,
    refetchQueries: [
      {
        query: GET_COMPLETED_QUESTIONS_BY_MODULE,
        variables: { moduleId, studentId },
      },
    ],

    update(proxy, { data: { startQuestion: startQuestionData } }) {
      setIsOpen(!isOpen);

      values.confirmTitle = "";
      setErrors({});
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function startQuestionCallback() {
    startQuestion();
  }

  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <button
          onClick={toggleIsOpen}
          type="submit"
          className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
        >
          {`${complete ? "revisit " : "Start "}`}
        </button>
      </form>

      {isOpen && !loading && errors ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
          ></button>

          <div className="fixed mx-auto overflow-auto inset-0 overflow-y-auto overscroll-contain max-w-2xl my-4 py-6 px-8 bg-white z-40 rounded-lg shadow-xl ">
            <QuestionModalCard
              props={props}
              question={question}
              answer=""
              complete={complete}
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
