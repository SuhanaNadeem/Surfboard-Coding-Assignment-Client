import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import CompletedQuestion from "./CompletedQuestion";

export default function ModuleSummaryBar({
  props,
  questions,
  studentPoints,
  totalPoints,
  completedQuestions,
  moduleId,
}) {
  const { student } = useContext(StudentAuthContext);

  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId: student && student.id },

      client: studentClient,
    }
  );

  const { values, onSubmit } = useForm(handleStarModuleCallback, {
    moduleId,
  });

  const [handleStarModule] = useMutation(HANDLE_STAR_MODULE, {
    client: studentClient,
    refetchQueries: [
      {
        query: GET_STUDENT_BY_ID,
        variables: { studentId: student && student.id },
      },
    ],

    update(proxy, { data: { handleStarModule: handleStarModuleData } }) {},
    onError(err) {
      // console.log(err);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function handleStarModuleCallback() {
    handleStarModule();
  }

  return studentObject ? (
    <nav className="flex flex-shrink-0  items-start justify-start text-gray-800 border-gray-300 border-b-2 md:border-r-2 md:border-b-0 text-left flex-col md:mt-6 md:w-1/4 lg:w-1/6 mt-2 cursor-default z-20 bg-white xl:pr-0 pr-2 w-full pb-3 md:pb-0">
      <form
        className="mb-2 flex justify-center items-center w-full"
        onSubmit={onSubmit}
      >
        <p className="text-xl text-red-800 md:w-5/6">Your Progress</p>

        <button
          id="starModule"
          type="submit"
          className="focus:outline-none flex justify-center items-center md:w-1/4 w-1/6 ml-2"
        >
          {studentObject.starredModules.includes(moduleId) ? (
            <BsStarFill size={20} />
          ) : (
            <BsStar size={20} />
          )}
        </button>
      </form>
      {/* <p className="text-md leading-none mb-6 font-light">{format} Module</p> */}
      <p className="text-lg leading-none">
        {studentPoints} of {totalPoints}
      </p>
      <p className="mb-4 text-md lg:text-sm tracking-wide uppercase lg:font-light font-normal">
        Lynx Tokens
      </p>
      <p className="mb-4 text-md md:text-sm tracking-wide uppercase font-normal lg:font-light leading-snug w-full truncate">
        {questions.length} Questions
      </p>
      {questions.map((questionId, index) => (
        <CompletedQuestion
          completedQuestions={completedQuestions}
          props={props}
          questionId={questionId}
          key={index}
        />
      ))}
    </nav>
  ) : (
    <div></div>
  );
}

export const GET_STUDENT_BY_ID = gql`
  query getStudentById($studentId: String!) {
    getStudentById(studentId: $studentId) {
      name
      starredQuestions
      starredModules
      completedQuestions
      completedSkills
      id
      icon
      orgName
      email
      password
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

export const HANDLE_STAR_MODULE = gql`
  mutation handleStarModule($moduleId: String!) {
    handleStarModule(moduleId: $moduleId)
  }
`;
