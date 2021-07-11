import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import {
  GET_BADGES_BY_STUDENT,
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
import AnswerAndSubmitDisplay from "./AnswerAndSubmitDisplay";
import { GET_QUESTION_BY_ID } from "./QuestionCard";
import QuestionDisplay from "./QuestionDisplay";
import StarQuestionCard from "./StarQuestionCard";
import ToggleAndClose from "./ToggleAndClose";

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

  const { data: { getSavedAnswerByQuestion: savedAnswer } = {} } = useQuery(
    GET_SAVED_ANSWER_BY_QUESTION,
    {
      variables: { questionId, studentId },
      client: studentClient,
    }
  );

  const {
    data: { getHintByQuestion: hint } = {},
    //loading: loadingHint,
  } = useQuery(GET_HINT_BY_QUESTION, {
    variables: { questionId: questionId },
    client: studentClient,
  });

  const { data: { getModuleById: module } = {} } = useQuery(GET_MODULE_BY_ID, {
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

  const { data: { getCompletedQuestionsByModule: completedQuestions } = {} } =
    useQuery(GET_COMPLETED_QUESTIONS_BY_MODULE, {
      variables: { moduleId, studentId },
      client: studentClient,
    });

  const [isOpen, setIsOpen] = useState(false);
  const [submitIsOpen, setSubmitIsOpen] = useState(true);

  const [hintVisible, setHintVisible] = useState(false);

  function toggleIsVisible() {
    setHintVisible(!hintVisible);
  }
  useEffect(() => {
    if (questionId) {
      // console.log("enters this use");
      // console.log(questionId);
      setValues({ studentId, questionId, answer: savedAnswer });
      // setIsOpen(completedQuestions.includes(questionId));
      // if (completedQuestions.includes(questionId)) {
      //   setSubmitIsOpen(false);
      // }
      if (completedQuestions.includes(questionId)) {
        // console.log("in here 1");
        setIsOpen(true);
        setSubmitIsOpen(false);
      }
      // setSubmitIsOpen(!completedQuestions.includes(questionId));
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
      {
        query: GET_SAVED_ANSWER_BY_QUESTION,
        variables: { questionId, studentId },
      },
      {
        query: GET_BADGES_BY_STUDENT,
        variables: { studentId },
      },
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
      }
      if (!completedQuestions.includes(questionId)) {
        // console.log("enters this 1");

        setIsOpen(true);
        setSubmitIsOpen(true);
      }
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  useEffect(() => {
    if (completedQuestions.includes(questionId)) {
      // console.log("problem still?");
      setIsOpen(true);
      setSubmitIsOpen(false);
    }
  }, [questionId, completedQuestions]);

  function handleAnswerPointsCallback() {
    setIsOpen(false);
    // console.log(193);
    // setSubmitIsOpen(true)

    handleAnswerPoints();
  }
  const { data: { getTotalPossibleModulePoints: totalPossiblePoints } = {} } =
    useQuery(GET_TOTAL_POSSIBLE_MODULE_POINTS, {
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
    // console.log("gone");
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
    setValues({ answer: "" });
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
        <QuestionDisplay question={question} />
        <AnswerAndSubmitDisplay
          // questionId={questionId}
          lazyCompletedQuestions={lazyCompletedQuestions}
          markedCorrect={markedCorrect}
          hint={hint}
          isOpen={isOpen}
          savedAnswer={savedAnswer}
          toggleIsVisible={toggleIsVisible}
          hintVisible={hintVisible}
          submitIsOpen={submitIsOpen}
          question={question}
          values={values}
          onSubmit={onSubmit}
          errors={errors}
          loadingHandleAnswerPoints={loadingHandleAnswerPoints}
          completedQuestions={completedQuestions}
          onChange={onChange}
        />
      </div>
      <ToggleAndClose
        question={question}
        module={module}
        onSubmit={onSubmit}
        togglePrevOpen={togglePrevOpen}
        setIsOpen={setIsOpen}
        setSubmitIsOpen={setSubmitIsOpen}
        toggleIsOpen={toggleIsOpen}
        studentObject={studentObject}
        completedQuestions={completedQuestions}
        goToEndCard={goToEndCard}
        toggleNextOpen={toggleNextOpen}
        // moduleId={moduleId}
      />
    </div>
  ) : (
    <></>
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
      completedSkills
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
