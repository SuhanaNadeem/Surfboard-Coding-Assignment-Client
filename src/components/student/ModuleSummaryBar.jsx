import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useMutation, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
import CompletedQuestion from "./CompletedQuestion";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useForm } from "../../util/hooks";

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
      variables: { studentId: student.id },

      client: studentClient,
    }
  );

  const { values, onSubmit } = useForm(handleStarModuleCallback, {
    moduleId,
  });

  const [handleStarModule, { loading }] = useMutation(HANDLE_STAR_MODULE, {
    client: studentClient,
    refetchQueries: [
      {
        query: GET_STUDENT_BY_ID,
        variables: { studentId: student.id },
      },
    ],

    update(proxy, { data: { handleStarModule: handleStarModuleData } }) {},
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function handleStarModuleCallback() {
    handleStarModule();
  }

  return studentObject ? (
    <nav className="flex flex-shrink-0 items-start justify-start md:max-w-2xl xl:max-w-5xl text-gray-800 border-gray-300 border-r-2 text-left flex-col md:static md:mt-6 md:w-1/6 mt-2 w-full cursor-default z-20">
      <form
        className="mb-2 flex justify-center items-center"
        onSubmit={onSubmit}
      >
        <p className="text-xl text-red-800">Your Progress</p>

        <button
          id="starModule"
          type="submit"
          className="focus:outline-none ml-2"
        >
          {studentObject.starredModules.includes(moduleId) ? (
            <BsStarFill size={16} />
          ) : (
            <BsStar size={16} />
          )}
        </button>
      </form>
      {/* <p className="text-md leading-none mb-6 font-light">{format} Module</p> */}
      <p className="text-lg leading-none">
        {studentPoints} of {totalPoints}
      </p>
      <p className="mb-4 text-sm tracking-wide uppercase font-light">
        Lynx Tokens
      </p>
      <p className="mb-4 text-sm tracking-wide uppercase font-light leading-snug">
        {questions.length} Questions/Skills
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
      id
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
