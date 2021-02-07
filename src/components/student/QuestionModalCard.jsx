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
import ReactPlayer from "react-player";

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
  // console.log(question);

  return question ? (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h3 className="text-3xl mb-6 text-red-800">{question.questionName}</h3>

      <div className="flex items-center justify-start text-left leading-snug">
        <div className="md:w-11/12">
          <h6 className="text-md font-light mb-4">
            {question.questionDescription}
          </h6>
          {question.videoLink !== "" && (
            <div className="">
              <ReactPlayer
                url={question.videoLink}
                width={448}
                height={252}
                muted={true}
              />
            </div>
          )}
          {question.type === "Question" && (
            <div className="flex">
              <input
                className="md:w-3/4 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none mr-4"
                name="answer"
                placeholder={savedAnswer ? savedAnswer : `Enter an answer`} // should be savedanswer
                value={values.answer}
                onChange={onChange}
                type="text"
              />
              <button
                type="submit"
                className="md:w-1/4 border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justif-center"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <button
          type={!complete && question.type === "Skill" ? `submit` : `button`}
          className="md:w-1/12 pl-2"
          // {!complete && question.type === "Skill" && `onClick=${console.log("hi")}`}
        >
          <GrNext size={32} />
        </button>
      </div>
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
