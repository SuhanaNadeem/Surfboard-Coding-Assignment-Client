import React, { useContext, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
import {
  GET_COMPLETED_QUESTIONS_BY_MODULE,
  GET_MODULE_POINTS_BY_STUDENT,
} from "../../pages/student/StudentModule";

import { GrNext } from "react-icons/gr";

export default function QuestionModalCard({
  props,
  question,
  answer,
  complete,
}) {
  const { student } = useContext(StudentAuthContext);
  const studentId = student.id;
  const moduleId = question.moduleId;
  const questionId = question.id;
  const [errors, setErrors] = useState({});

  const {
    data: { getSavedAnswerByQuestion: savedAnswer } = {},
    loading: loadingSavedAnswer,
    savedAnswerError,
  } = useQuery(GET_SAVED_ANSWER_BY_QUESTION, {
    variables: { questionId: questionId, studentId: studentId },
    client: studentClient,
  });

  const { values, onChange, onSubmit } = useForm(handleAnswerPointsCallback, {
    answer,
    questionId,
    studentId,
  });

  const [handleAnswerPoints, { loading }] = useMutation(HANDLE_ANSWER_POINTS, {
    client: studentClient,
    refetchQueries: [
      {
        query: GET_COMPLETED_QUESTIONS_BY_MODULE,
        variables: { moduleId, studentId },
      },
      {
        query: GET_MODULE_POINTS_BY_STUDENT,
        variables: { moduleId, studentId },
      },
    ],

    update(proxy, { data: { handleAnswerPoints: handleAnswerPointsData } }) {
      values.confirmTitle = "";
      setErrors({});
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function handleAnswerPointsCallback() {
    handleAnswerPoints();
  }
  // console.log(questionId);
  // console.log(answer);

  return question && savedAnswer ? (
    <form onSubmit={onSubmit}>
      {question.type === "Question" && (
        <input
          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none"
          name="answer"
          placeholder={savedAnswer} // should be savedanswer
          value={values.answer}
          onChange={onChange}
          type="text"
        />
      )}
      {question.type === "Question" ? (
        <button
          type="submit"
          className="flex border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold"
        >
          Submit
        </button>
      ) : (
        <button type={!complete ? `submit` : `button`} className="flex ">
          <GrNext size={32} />
        </button>
      )}
      <div>Hi there</div>
    </form>
  ) : (
    <div></div>
  );
}

export const HANDLE_ANSWER_POINTS = gql`
  mutation handleAnswerPoints(
    $questionId: String!
    $studentId: String!
    $answer: String
  ) {
    handleAnswerPoints(
      questionId: $questionId
      studentId: $studentId
      answer: $answer
    )
  }
`;

export const GET_SAVED_ANSWER_BY_QUESTION = gql`
  query getSavedAnswerByQuestion($questionId: String!, $studentId: String!) {
    getSavedAnswerByQuestion(questionId: $questionId, studentId: $studentId)
  }
`;
