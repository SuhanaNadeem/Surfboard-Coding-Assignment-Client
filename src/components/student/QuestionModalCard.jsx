import React, { useContext, useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";
import {
  GET_COMPLETED_QUESTIONS_BY_MODULE,
  GET_MODULE_BY_ID,
  GET_MODULE_POINTS_BY_STUDENT,
} from "../../pages/student/StudentModule";
import {
  GET_COMPLETED_MODULES_BY_STUDENT,
  GET_IN_PROGRESS_MODULES_BY_STUDENT,
} from "../../pages/student/StudentDashboard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPlayer from "react-player";
import { GET_QUESTION_BY_ID } from "./QuestionCard";
import FeedbackModal from "./FeedbackModal";
import StarQuestionCard from "./StarQuestionCard";
import ModuleEndCard from "./ModuleEndCard";

function QuestionModalCard({
  props,
  questionId,
  answer,
  handleQuestionClick,
  moduleId,
  toggleQuesCard,
  initialPoints,
}) {
  const { student } = useContext(StudentAuthContext);
  const studentId = student.id;
  const [errors, setErrors] = useState({});

  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
    refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: studentClient,
  });

  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId },
      client: studentClient,
    }
  );

  const {
    data: { getSavedAnswerByQuestion: savedAnswer } = {},
    loading: loadingSavedAnswer,
    refetch: refetchSavedAnswer,
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

  const { values, onChange, onSubmit, setValues } = useForm(
    handleAnswerPointsCallback,
    {
      answer,
      questionId,
      studentId,
    }
  );

  const {
    data: { getCompletedQuestionsByModule: completedQuestions } = {},
    loading: loadingCompletedQuestionsByModule,
    completedQuestionsByModuleError,
  } = useQuery(GET_COMPLETED_QUESTIONS_BY_MODULE, {
    variables: { moduleId: moduleId, studentId: studentId },
    client: studentClient,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [endCardIsOpen, setEndCardIsOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  function toggleIsVisible() {
    setHintVisible(!hintVisible);
  }
  useEffect(() => {
    if (questionId) {
      setValues({ ...values, questionId, answer: savedAnswer });
      setIsOpen(completedQuestions.includes(questionId));
      setHintVisible(false);
    }
  }, [questionId, savedAnswer, hint]);

  useEffect(() => {
    if (question && question.type === "Question") {
      setIsOpen(true);
    }
  }, [completedQuestions]);

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
      { query: GET_QUESTION_BY_ID, variables: { questionId } },
      { query: GET_STUDENT_BY_ID, variables: { studentId } },
      { query: GET_COMPLETED_MODULES_BY_STUDENT, variables: { studentId } },
      { query: GET_IN_PROGRESS_MODULES_BY_STUDENT, variables: { studentId } },
    ],

    update(proxy, { data }) {
      console.log(values);
      setIsOpen(true);
      setErrors({});

      if (question.type === "Skill") {
        var nextQuesId =
          module && module.questions[module.questions.indexOf(question.id) + 1];
        handleQuestionClick(nextQuesId);
      }
    },
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function handleAnswerPointsCallback() {
    handleAnswerPoints();
  }

  function togglePrevOpen() {
    var prevQuesId =
      module && module.questions[module.questions.indexOf(question.id) - 1];
    handleQuestionClick(prevQuesId);
  }

  function toggleNextOpen() {
    var nextQuesId =
      module && module.questions[module.questions.indexOf(question.id) + 1];
    // refetchQuestion({ questionId: nextQuesId });
    handleQuestionClick(nextQuesId);
  }
  function toggleEndCardIsOpen() {
    setEndCardIsOpen(true);
  }
  // console.log(question);
  return question && completedQuestions && studentObject ? (
    <div className="justify-between flex flex-col h-full">
      <div className="flex flex-col items-center justify-start text-center overflow-y-auto ">
        <h3 className="text-3xl text-red-800 mx-auto mb-2">{question.name}</h3>
        <StarQuestionCard
          props={props}
          questionId={questionId}
          studentObject={studentObject}
        />
        <div>
          {question.image && question.image !== "" && (
            <div
              className="bg-cover mb-6 w-64 h-32 bg-center bg-no-repeat rounded-lg hover:shadow-md mx-auto"
              style={{
                backgroundImage: `url(${question.image})`,
              }}
            ></div>
          )}
        </div>
        {question.articleLink && question.articleLink !== "" && (
          <div className="flex justify-center items-center mb-2 w-full">
            <h5 className="font-semibold uppercase tracking-wide text-xs mr-2">
              Article:
            </h5>
            <a
              className="font-light text-sm truncate"
              href={question.articleLink}
              target="_blank"
            >
              {question.articleLink}
            </a>
          </div>
        )}

        {/* admin will upload images, but question type will store aws link. admin will upload + we'll store yt vid links */}
        <h6 className="text-md font-light leading-snug">
          {question.description}
        </h6>
        {question.extraLink && question.extraLink !== "" && (
          <div className="flex justify-center items-center mb-2 w-full">
            <h5 className="font-semibold uppercase tracking-wide text-xs mr-2">
              Visit:
            </h5>
            <a
              className="font-light text-sm truncate"
              href={question.extraLink}
              target="_blank"
            >
              {question.extraLink}
            </a>
          </div>
        )}

        {question.videoLink && question.videoLink !== "" && (
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
          <div className="flex flex-col">
            <form
              onSubmit={onSubmit}
              className={`${
                !completedQuestions.includes(questionId) ? `items-center ` : ``
              }  flex mt-4 justify-center ${
                question.questionFormat === "Multiple Choice" ? `flex-col` : ``
              }`}
            >
              {question.questionFormat === "Multiple Choice" ? (
                <div className="flex flex-col text-md font-light justify-center items-start">
                  <div>
                    <input
                      name="answer"
                      value="A"
                      onChange={onChange}
                      error={errors.type ? "true" : "false"}
                      type="radio"
                      id="A"
                    />
                    <label htmlFor="A">{question.optionA}</label>
                  </div>
                  <div>
                    <input
                      name="answer"
                      value="B"
                      onChange={onChange}
                      error={errors.type ? "true" : "false"}
                      type="radio"
                      id="B"
                    />
                    <label htmlFor="B">{question.optionB}</label>
                  </div>
                  <div>
                    <input
                      name="answer"
                      value="C"
                      onChange={onChange}
                      error={errors.type ? "true" : "false"}
                      type="radio"
                      id="C"
                    />
                    <label htmlFor="C">{question.optionC}</label>
                  </div>
                  <div>
                    <input
                      name="answer"
                      value="D"
                      onChange={onChange}
                      error={errors.type ? "true" : "false"}
                      type="radio"
                      id="D"
                    />
                    <label htmlFor="D">{question.optionD}</label>
                  </div>
                </div>
              ) : (
                <input
                  className="md:w-3/4 shadow appearance-none border rounded w-full font-light  py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                  name="answer"
                  placeholder="Enter an answer"
                  value={values.answer}
                  onChange={onChange}
                  type="text"
                />
              )}
              {!completedQuestions.includes(questionId) && (
                <button
                  onClick={console.log(values)}
                  type="submit"
                  className={`${
                    question.questionFormat === "Multiple Choice"
                      ? `mt-4 w-16`
                      : `ml-4 w-20`
                  }  border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justify-center flex`}
                >
                  Submit
                </button>
              )}
            </form>
            {!completedQuestions.includes(questionId) && hint && (
              <button
                onClick={toggleIsVisible}
                type="button"
                className="focus:outline-none flex mx-auto mt-2 px-4 py-2 uppercase text-black tracking-wide hover:text-red-800 text-xs"
              >
                <h3 className="font-semibold">Hint</h3>
                {hintVisible && <h3 className="ml-2">{hint}</h3>}
              </button>
            )}
            <FeedbackModal
              props={props}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isCorrect={completedQuestions.includes(questionId)}
              moduleId={moduleId}
              question={question}
            />
          </div>
        )}
      </div>
      <form className="flex mt-6" onSubmit={onSubmit}>
        {module && module.questions.indexOf(question.id) != 0 && (
          <button className="mx-auto" onClick={togglePrevOpen} type="button">
            <BsChevronLeft size={32} />
          </button>
        )}

        {((module &&
          module.questions.indexOf(question.id) + 1 ===
            module.questions.length &&
          studentObject.completedModules.includes(moduleId)) ||
          (module &&
            module.questions.indexOf(question.id) + 1 !==
              module.questions.length)) && (
          <button
            className="mx-auto"
            type={question.type === "Skill" ? `submit` : `button`}
            onClick={(e) => {
              if (
                module &&
                module.questions.indexOf(question.id) + 1 ===
                  module.questions.length
              ) {
                // console.log(endCardIsOpen);
                toggleEndCardIsOpen(e);
              } else if (question.type !== "Skill") {
                toggleNextOpen(e);
              }
            }}
          >
            <BsChevronRight size={32} />
          </button>
        )}
      </form>
      <ModuleEndCard
        props={props}
        module={module}
        isOpen={endCardIsOpen}
        setIsOpen={setEndCardIsOpen}
        toggleQuesCard={toggleQuesCard}
        student={studentObject}
      />
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

export const GET_STUDENT_BY_ID = gql`
  query getStudentById($studentId: String!) {
    getStudentById(studentId: $studentId) {
      name
      email
      orgName
      starredQuestions
      completedModules
      inProgressModules
      starredModules
      id
      quesAnsDict {
        key
        value
        studentId
        id
      }
      modulePointsDict {
        key
        value
        studentId
        id
      }
    }
  }
`;

export default QuestionModalCard;
