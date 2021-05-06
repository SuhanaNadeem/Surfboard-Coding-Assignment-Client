import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/student/Footer";
import LoadingScreen from "../../components/student/LoadingScreen";
import ModuleEndCard from "../../components/student/ModuleEndCard";
import ModuleSummaryBar, {
  GET_STUDENT_BY_ID,
} from "../../components/student/ModuleSummaryBar";
import NavBar from "../../components/student/NavBar";
import QuestionCard, {
  GET_QUESTION_BY_ID,
} from "../../components/student/QuestionCard";
import QuestionModal from "../../components/student/QuestionModal";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import ReactGA from "react-ga";

export default function StudentModule(props) {
  const { student } = useContext(StudentAuthContext);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  if (!student) {
    props.history.push("/login");
  }
  // const [activeQuestionId, setActiveQuestionId] = useState(
  //   selectedQuestionId
  // );
  const [endCardIsOpen, setEndCardIsOpen] = useState(false);
  // function toggleEndCardIsOpen() {
  //   setEndCardIsOpen(true);
  // }
  // console.log(student);
  const moduleId = props.match.params.moduleId;
  var selectedQuestionId = props.match.params.questionId;
  // if (selectedQuestionId === "end") {
  //   toggleEndCardIsOpen();
  // }
  // useEffect(() => {
  //   setActiveQuestionId(selectedQuestionId);

  // }, [selectedQuestionId]);

  const [activeQuestionId, setActiveQuestionId] = useState(selectedQuestionId);

  useEffect(() => {
    setActiveQuestionId(selectedQuestionId);
  }, [setActiveQuestionId, selectedQuestionId]);

  const { data: { getModuleById: module } = {} } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
    client: studentClient,
  });
  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId: student && student.id },
      client: studentClient,
    }
  );

  const { data: { getTotalPossibleModulePoints: totalPoints } = {} } = useQuery(
    GET_TOTAL_POSSIBLE_MODULE_POINTS,
    {
      variables: { moduleId: moduleId },
      client: studentClient,
    }
  );
  // query to get module points

  const { data: { getModulePointsByStudent: studentPoints } = {} } = useQuery(
    GET_MODULE_POINTS_BY_STUDENT,
    {
      variables: { moduleId: moduleId, studentId: student && student.id },
      client: studentClient,
    }
  );

  const {
    data: { getCompletedQuestionsByModule: completedQuestions } = {},
  } = useQuery(GET_COMPLETED_QUESTIONS_BY_MODULE, {
    variables: { moduleId: moduleId, studentId: student && student.id },
    client: studentClient,
  });

  function handleQuestionClick(selectedQuestionId) {
    // console.log("passed");
    if (selectedQuestionId) {
      setActiveQuestionId(selectedQuestionId);
      // refetchQuestion({ questionId: selectedQuestionId });
      props.history.push(`/module/${moduleId}/${selectedQuestionId}`);
    } else {
      setActiveQuestionId("");
      props.history.push(`/module/${moduleId}`);
    }
  }

  const [getQuestionById] = useLazyQuery(GET_QUESTION_BY_ID);

  useEffect(() => {
    setActiveQuestionId(selectedQuestionId);
    getQuestionById({ variables: { questionId: selectedQuestionId } });
  }, [selectedQuestionId, getQuestionById]);
  // CHANGED SUMN HERE
  const [isOpen, setIsOpen] = useState(
    activeQuestionId !== undefined && activeQuestionId !== "" ? true : false
  );
  const studentModule =
    student && module && completedQuestions ? (
      <div className="h-full flex flex-col min-h-screen w-full">
        <NavBar props={props} />
        <div className="bg-red-800 w-full h-32 flex flex-col justify-end px-10 lg:pl-32 xl:pl-48 py-5 pb-10">
          <p className="text-4xl text-white truncate pb-1 ">{module.name}</p>
        </div>
        <div className="h-full md:flex-1 md:flex mx-10 lg:mx-32 xl:mx-48 mt-4 mb-8">
          <ModuleSummaryBar
            props={props}
            questions={module.questions}
            studentPoints={studentPoints}
            totalPoints={totalPoints}
            completedQuestions={completedQuestions}
            moduleId={moduleId}
          />
          <div className="w-full md:w-3/4 lg:w-5/6 mt-6 md:ml-10">
            <img
              alt="LYNX Logo"
              src="https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
              className="hidden lg:block absolute right-22 xl:right-40 my-auto h-full fill-current opacity-25 "
            />
            <div className="grid gap-4 items-stretch md:justify-start h-full md:pl-2 relative w-full">
              {module.questions.map((questionId, index) => (
                <QuestionCard
                  key={index}
                  props={props}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  studentId={student.id}
                  questionId={questionId}
                  activeQuestionId={activeQuestionId}
                  complete={completedQuestions.includes(questionId)}
                  handleQuestionClick={handleQuestionClick}
                />
              ))}
            </div>
          </div>

          <QuestionModal
            props={props}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            moduleId={moduleId}
            initialPoints={studentPoints}
            activeQuestionId={activeQuestionId}
            handleQuestionClick={handleQuestionClick}
          />
        </div>
        <ModuleEndCard
          props={props}
          module={module}
          isOpen={endCardIsOpen}
          setQuesIsOpen={setIsOpen}
          setIsOpen={setEndCardIsOpen}
          // toggleQuesCard={toggleQuesCard}
          selectedQuestionId={selectedQuestionId}
          student={studentObject}
        />
        <Footer />
      </div>
    ) : (
      <LoadingScreen />
    );
  return studentModule;
}
export const GET_MODULE_BY_ID = gql`
  query getModuleById($moduleId: String!) {
    getModuleById(moduleId: $moduleId) {
      id
      name
      image
      questions
      categoryId
    }
  }
`;

export const GET_TOTAL_POSSIBLE_MODULE_POINTS = gql`
  query getTotalPossibleModulePoints($moduleId: String!) {
    getTotalPossibleModulePoints(moduleId: $moduleId)
  }
`;
export const GET_MODULE_POINTS_BY_STUDENT = gql`
  query getModulePointsByStudent($moduleId: String!, $studentId: String!) {
    getModulePointsByStudent(moduleId: $moduleId, studentId: $studentId)
  }
`;
export const GET_COMPLETED_QUESTIONS_BY_MODULE = gql`
  query getCompletedQuestionsByModule($moduleId: String!, $studentId: String!) {
    getCompletedQuestionsByModule(moduleId: $moduleId, studentId: $studentId)
  }
`;
