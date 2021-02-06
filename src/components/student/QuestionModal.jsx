import React, { useContext, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
export default function QuestionModal({ props, question, complete }) {
  const { student } = useContext(StudentAuthContext);
  const studentId = student.id;
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
    refetchQueries: [],
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
      <button
        onClick={toggleIsOpen}
        className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
      >
        {`${complete ? "Resume " : "Start "}`}
      </button>
      {isOpen && !loading && errors ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
          ></button>

          <div className="fixed mx-auto overflow-auto inset-0 overscroll-contain max-w-lg my-2 px-3 py-4 bg-white z-40 rounded-lg shadow-xl z-20">
            <h6 className=" font-semibold text-2xl uppercase tracking-wide ">
              {question.questionName}
            </h6>

            <div className="flex flex-col">
              <form onSubmit={onSubmit} noValidate>
                <button
                  onClick={toggleIsOpen}
                  className=" border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
                >
                  Cancel
                </button>
              </form>
            </div>
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
