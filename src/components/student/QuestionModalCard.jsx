import React, { useContext, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
import {
  GET_COMPLETED_QUESTIONS_BY_MODULE,
  GET_MODULE_BY_ID,
  GET_MODULE_POINTS_BY_STUDENT,
} from "../../pages/student/StudentModule";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPlayer from "react-player";
import { GET_QUESTION_BY_ID } from "./CompletedQuestion";

export default function QuestionModalCard({
  props,
  question,
  answer,
  complete,
  num,
  handleQuestionClick,
}) {
  const { student } = useContext(StudentAuthContext);
  const studentId = student.id;
  const moduleId = question.moduleId;
  const questionId = question.id;
  const [errors, setErrors] = useState({});

  const {
    data: { getSavedAnswerByQuestion: savedAnswer } = {},
    loading: loadingSavedAnswer,
  } = useQuery(GET_SAVED_ANSWER_BY_QUESTION, {
    variables: { questionId: questionId, studentId: studentId },
    client: studentClient,
  });
  const {
    data: { getHintByQuestion: hint } = {},
    loading: loadingHint,
    hintError,
  } = useQuery(GET_HINT_BY_QUESTION, {
    variables: { questionId: questionId },
    client: studentClient,
  });

  const {
    data: { getModuleById: module } = {},
    loading: loadingGetModuleById,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
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

    update(proxy, { data }) {
      console.log("object");
      console.log(data.handleAnswerPoints);
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

  function togglePrevOpen() {
    handleQuestionClick(
      module && module.questions[module.questions.indexOf(questionId) - 1]
    );
  }

  function toggleNextOpen() {
    handleQuestionClick(
      module && module.questions[module.questions.indexOf(questionId) + 1]
    );
  }

  return question ? (
    <div className="justify-between flex flex-col h-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center text-center"
      >
        <h3 className="text-3xl text-red-800 mx-auto mb-4">
          {question.questionName}
        </h3>
        {question.image && (
          <div
            className="bg-cover mb-6 w-64 flex flex-col h-32 bg-center bg-no-repeat rounded-lg hover:shadow-md mx-auto"
            style={{
              backgroundImage: `url(${question.image})`,
            }}
          ></div>
        )}
        <div className="">
          {/* admin will upload images, but question type will store aws link. admin will upload + we'll store yt vid links */}
          <h6 className="text-md font-light leading-snug">
            {question.questionDescription}
          </h6>
          {question.videoLink && (
            <div className="mt-4 ">
              <ReactPlayer
                url={question.videoLink}
                width={557.33}
                height={300}
                muted={true}
              />
            </div>
          )}
          {question.type === "Question" && (
            <div className="flex mt-4">
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

        {/* TODO toggle Hint, toggle star, and toggle correct or not */}
      </form>
      <div className="flex mt-6">
        {num != 0 && (
          <button className="mx-auto" onClick={togglePrevOpen}>
            <BsChevronLeft size={32} />
          </button>
        )}
        {module &&
          module.questions.indexOf(questionId) + 1 !=
            module.questions.length && (
            <button
              className="mx-auto"
              type={
                !complete && question.type === "Skill" ? `submit` : `button`
              }
              onClick={toggleNextOpen}
              // {!complete && question.type === "Skill" && `onClick=${console.log("hi")}`}
            >
              <BsChevronRight size={32} />
            </button>
          )}
      </div>
    </div>
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

export const GET_HINT_BY_QUESTION = gql`
  query getHintByQuestion($questionId: String!) {
    getHintByQuestion(questionId: $questionId)
  }
`;
