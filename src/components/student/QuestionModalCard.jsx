import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import ReactPlayer from "react-player";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import {
  GET_COMPLETED_MODULES_BY_STUDENT,
  GET_IN_PROGRESS_MODULES_BY_STUDENT,
} from "../../pages/student/StudentDashboard";
import {
  GET_COMPLETED_QUESTIONS_BY_MODULE,
  GET_MODULE_BY_ID,
  GET_MODULE_POINTS_BY_STUDENT,
  GET_TOTAL_POSSIBLE_MODULE_POINTS,
} from "../../pages/student/StudentModule";
import { useForm } from "../../util/hooks";
import FeedbackModal from "./FeedbackModal";
import { GET_QUESTION_BY_ID } from "./QuestionCard";
import StarQuestionCard from "./StarQuestionCard";

function QuestionModalCard({
  props,
  questionId,
  answer,
  handleQuestionClick,
  moduleId,
  toggleIsOpen,
}) {
  const { student } = useContext(StudentAuthContext);
  var studentId;
  if (student) {
    studentId = student.id;
  }
  const [errors, setErrors] = useState({});

  const {
    data: { getQuestionById: question } = {},
    //loading: loadingQuestion,
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
    //loading: loadingSavedAnswer,
  } = useQuery(GET_SAVED_ANSWER_BY_QUESTION, {
    variables: { questionId: questionId, studentId: studentId },
    client: studentClient,
  });

  const {
    data: { getHintByQuestion: hint } = {},
    //loading: loadingHint,
  } = useQuery(GET_HINT_BY_QUESTION, {
    variables: { questionId: questionId },
    client: studentClient,
  });

  const {
    data: { getModuleById: module } = {},
    //loading: loadingGetModuleById,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
    client: studentClient,
  });
  const [
    getLazyCompletedQuestionsByModule,
    { data: { getCompletedQuestionsByModule: lazyCompletedQuestions } = {} },
  ] = useLazyQuery(GET_COMPLETED_QUESTIONS_BY_MODULE);

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
    //loading: loadingCompletedQuestionsByModule,
  } = useQuery(GET_COMPLETED_QUESTIONS_BY_MODULE, {
    variables: { moduleId, studentId },
    client: studentClient,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  function toggleIsVisible() {
    setHintVisible(!hintVisible);
  }
  useEffect(() => {
    if (questionId) {
      setValues({ studentId, questionId, answer: savedAnswer });
      setIsOpen(completedQuestions.includes(questionId));
      setHintVisible(false);
    }
  }, [questionId, setValues, studentId, savedAnswer, completedQuestions]);
  // [questionId, savedAnswer, hint, completedQuestions, setValues, values]
  // CHANGED SUMN HERE: completedQuestions, setValues, values
  // CHANGED SUMN HERE completedQuestions, loadingCompletedQuestionsByModule,loadingGetModuleById,loadingHandleAnswerPoints,loadingHint,loadingQuestion,loadingSavedAnswer
  const [
    handleAnswerPoints,
    {
      loading: loadingHandleAnswerPoints,
      data: { handleAnswerPoints: markedCorrect } = {},
    },
  ] = useMutation(HANDLE_ANSWER_POINTS, {
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
    onCompleted({ handleAnswerPoints }) {
      // console.log("on completed");
      if (handleAnswerPoints) {
        getLazyCompletedQuestionsByModule({
          variables: { moduleId, studentId },
          client: studentClient,
        });
      }
    },
    update() {
      setErrors({});
      // console.log("done mutation");
      if (question.type === "Skill") {
        var nextQuesId =
          module && module.questions[module.questions.indexOf(question.id) + 1];
        handleQuestionClick(nextQuesId);
        if (!completedQuestions.includes(nextQuesId)) {
          setIsOpen(false);
        }
      } else {
        setIsOpen(true);
      }
    },
    onError(err) {
      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  useEffect(() => {
    if (!completedQuestions.includes(questionId)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [questionId, completedQuestions]);

  function handleAnswerPointsCallback() {
    setIsOpen(false);
    handleAnswerPoints();
  }
  const {
    data: { getTotalPossibleModulePoints: totalPossiblePoints } = {},
  } = useQuery(GET_TOTAL_POSSIBLE_MODULE_POINTS, {
    variables: { moduleId },
    client: studentClient,
  });
  const { data: { getModulePointsByStudent: studentPoints } = {} } = useQuery(
    GET_MODULE_POINTS_BY_STUDENT,
    {
      variables: { moduleId, studentId },
      client: studentClient,
    }
  );
  function goToEndCard() {
    if (studentPoints === totalPossiblePoints) {
      props.history.push(`/module/${module.id}/end`);
    }
  }
  function togglePrevOpen() {
    var prevQuesId =
      module && module.questions[module.questions.indexOf(question.id) - 1];
    handleQuestionClick(prevQuesId);
  }

  function toggleNextOpen() {
    var nextQuesId =
      module && module.questions[module.questions.indexOf(question.id) + 1];
    // console.log(nextQuesId);
    handleQuestionClick(nextQuesId);
  }

  return question && completedQuestions && studentObject && module && errors ? (
    <div className="justify-between flex flex-col h-full">
      <div className="flex flex-col items-center justify-start text-center overflow-y-auto ">
        <h3 className="text-3xl text-red-800 mx-auto mb-2">{question.name}</h3>
        <StarQuestionCard
          props={props}
          questionId={questionId}
          studentObject={studentObject}
        />
        {question.image && question.image !== "" && (
          <div className="mt-2 mb-4 mx-auto">
            <img
              className="w-full h-72 object-cover object-center rounded-lg  "
              alt="Question"
              src={question.image}
            />
          </div>
        )}
        {question.articleLink && question.articleLink !== "" && (
          <div className="flex justify-center items-center mb-2 w-full">
            <h5 className="font-semibold uppercase tracking-wide text-xs mr-2">
              Article:
            </h5>
            <a
              className="font-light text-md lg:text-sm truncate focus:outline-none focus:text-blue-500"
              href={question.articleLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {question.articleLink}
            </a>
          </div>
        )}

        {/* admin will upload images, but question type will store aws link. admin will upload + we'll store yt vid links */}
        <h6 className="text-md text-left font-normal lg:font-light leading-snug ">
          {question.description}
        </h6>
        {question.extraLink && question.extraLink !== "" && (
          <div className="flex justify-center items-center mb-2 w-full">
            <h5 className="font-semibold uppercase tracking-wide text-xs mr-2">
              Visit:
            </h5>
            <a
              className="font-normal lg:font-light text-md lg:text-sm truncate leading-tight w-1/2 md:w-full text-center"
              href={question.extraLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {question.extraLink}
            </a>
          </div>
        )}

        {question.videoLink && question.videoLink !== "" && (
          <>
            <div className="mt-4 w-full mb-2">
              <ReactPlayer
                url={question.videoLink}
                width="100%"
                height={300}
                controls={true}
              />
            </div>
            {/* <button onClick={handleClickFullscreen}>Fullscreen</button> */}
          </>
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
                // && !completedQuestions.includes(question.id)
                <div
                  className={`flex flex-col text-md font-normal lg:font-light justify-center items-start ${
                    errors.answer ? "text-red-800" : ""
                  }`}
                >
                  <div>
                    <input
                      name="answer"
                      value="A"
                      onChange={onChange}
                      error={errors.type ? "true" : "false"}
                      type="radio"
                      id="A"
                      className="mr-2"
                      checked={
                        (completedQuestions.includes(question.id) &&
                          savedAnswer === "A") ||
                        values.answer === "A"
                          ? true
                          : false
                      }
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
                      className="mr-2"
                      checked={
                        (completedQuestions.includes(question.id) &&
                          savedAnswer === "B") ||
                        values.answer === "B"
                          ? true
                          : false
                      }
                      // checked={true}
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
                      checked={
                        (completedQuestions.includes(question.id) &&
                          savedAnswer === "C") ||
                        values.answer === "C"
                          ? true
                          : false
                      }
                      className="mr-2"
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
                      checked={
                        (completedQuestions.includes(question.id) &&
                          savedAnswer === "D") ||
                        values.answer === "D"
                          ? true
                          : false
                      }
                      className="mr-2"
                    />
                    <label htmlFor="D">{question.optionD}</label>
                  </div>
                  {errors.answer && (
                    <p className="font-light text-red-800">
                      <b>&#33;</b> {errors.answer}
                    </p>
                  )}
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
              {!completedQuestions.includes(questionId) &&
              !loadingHandleAnswerPoints &&
              !isOpen ? (
                <button
                  // onClick={(e) => {
                  //   e.preventDefault();
                  // }}
                  type="submit"
                  className={`${
                    question.questionFormat === "Multiple Choice"
                      ? `mt-4 w-16`
                      : `ml-4 w-20`
                  }  border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justify-center flex focus:outline-none focus:ring`}
                >
                  Submit
                </button>
              ) : (
                loadingHandleAnswerPoints &&
                !isOpen && (
                  <svg
                    class="fill-current animate-spin h-4 mt-4 text-red-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )
              )}
            </form>
            {!completedQuestions.includes(questionId) && hint && hint !== "" && (
              <button
                onClick={toggleIsVisible}
                type="button"
                className="focus:outline-none flex mx-auto mt-2 px-4 py-2 uppercase text-black tracking-wide hover:text-red-800 text-xs"
              >
                <h3 className="font-semibold">Hint</h3>
                {hintVisible && !loadingHandleAnswerPoints && !isOpen && (
                  <h3 className="ml-2">{hint}</h3>
                )}
              </button>
            )}
            {isOpen && (
              <FeedbackModal
                lazyCompletedQuestions={lazyCompletedQuestions}
                questionId={questionId}
                markedCorrect={markedCorrect}
              />
            )}
          </div>
        )}
      </div>
      <form className="flex mt-6 justify-between" onSubmit={onSubmit}>
        {module.questions.indexOf(question.id) !== 0 && (
          <button
            className="mx-auto focus:outline-none focus:ring rounded-sm"
            onClick={togglePrevOpen}
            type="button"
          >
            <BsChevronLeft size={32} />
          </button>
        )}
        <button
          className="mx-auto focus:outline-none focus:ring rounded-sm"
          onClick={toggleIsOpen}
          type="button"
        >
          <GrClose size={26} />
        </button>
        {((module.questions.indexOf(question.id) + 1 ===
          module.questions.length &&
          studentObject.completedModules.includes(moduleId)) ||
          module.questions.indexOf(question.id) + 1 !==
            module.questions.length ||
          (module.questions.indexOf(question.id) + 1 ===
            module.questions.length &&
            module.questions.length === 1) ||
          question.type === "Skill") && (
          <button
            className="mx-auto focus:outline-none focus:ring rounded-sm"
            type={question.type === "Skill" ? `submit` : `button`}
            onClick={(e) => {
              // console.log("entered onclick");

              if (
                module.questions.indexOf(question.id) + 1 ===
                module.questions.length
              ) {
                toggleIsOpen();
                goToEndCard();
                // used to toggle here
              } else if (question.type !== "Skill") {
                e.preventDefault();

                toggleNextOpen(e);
              }
            }}
          >
            {/* TODO: wokring on endcard when last q is skill + skipping skill when next is clicked on q + fixed wrong -> correct!! */}
            <BsChevronRight size={32} />
          </button>
        )}
      </form>
      {/* <ModuleEndCard
        props={props}
        module={module}
        isOpen={endCardIsOpen}
        setIsOpen={setEndCardIsOpen}
        toggleQuesCard={toggleQuesCard}
        student={studentObject}
      /> */}
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
      completedQuestions
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
