import React, { useState, useContext } from "react";
import { useForm } from "../../util/hooks";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useQuery, useMutation } from "@apollo/client";
import NavBar from "../../components/student/NavBar";
import Footer from "../../components/student/Footer";
import { studentClient } from "../../GraphqlApolloClients";
import ModuleSummaryBar from "../../components/student/ModuleSummaryBar";
import QuestionCard from "../../components/student/QuestionCard";

export default function StudentModule(props) {
  const { student } = useContext(StudentAuthContext);

  if (!student) {
    props.history.push("/login");
  }

  // console.log(student);
  const moduleId = props.match.params.moduleId;
  // startModule AND addInProgressModule/addCompleted must be managed
  // console.log(moduleId);
  const {
    data: { getModuleById: module } = {},
    loading: loadingModule,
    moduleError,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
    client: studentClient,
  });

  // console.log(module);

  const {
    data: { getTotalPossibleModulePoints: totalPoints } = {},
    loading: loadingTotalPoints,
    totalPointsError,
  } = useQuery(GET_TOTAL_POSSIBLE_MODULE_POINTS, {
    variables: { moduleId: moduleId },
    client: studentClient,
  });
  // query to get module points

  const {
    data: { getModulePointsByStudent: studentPoints } = {},
    loading: loadingStudentPoints,
    studentPointsError,
  } = useQuery(GET_MODULE_POINTS_BY_STUDENT, {
    variables: { moduleId: moduleId, studentId: student.id },
    client: studentClient,
  });

  const {
    data: { getCompletedQuestionsByModule: completedQuestions } = {},
    loading: loadingCompletedQuestionsByModule,
    completedQuestionsByModuleError,
  } = useQuery(GET_COMPLETED_QUESTIONS_BY_MODULE, {
    variables: { moduleId: moduleId, studentId: student.id },
    client: studentClient,
  });

  const studentModule =
    student && module && completedQuestions ? (
      <div className="h-full flex flex-col min-h-screen">
        <NavBar />
        <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-36 pb-10">
          <p className="text-4xl text-white">{module.name}</p>
        </div>
        <div className="h-full flex-1 flex mx-36 mt-4 mb-8">
          <ModuleSummaryBar
            props={props}
            questions={module.questions}
            studentPoints={studentPoints}
            totalPoints={totalPoints}
            completedQuestions={completedQuestions}
          />
          <div className="md:w-5/6 last:mt-4">
            <div className="mt-6 ml-10 grid gap-2 items-stretch justify-center overflow-y-auto h-96 rounded-lg border-gray-300 border-2">
              {module.questions.map((questionId, index) => (
                <QuestionCard
                  key={index}
                  props={props}
                  questionId={questionId}
                  complete={completedQuestions.includes(questionId)}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <div className="h-full flex flex-col min-h-screen">
        <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
          <p>LOADING</p>
        </div>
      </div>
    );
  return studentModule;
}
export const GET_MODULE_BY_ID = gql`
  query getModuleById($moduleId: String!) {
    getModuleById(moduleId: $moduleId) {
      id
      name
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
