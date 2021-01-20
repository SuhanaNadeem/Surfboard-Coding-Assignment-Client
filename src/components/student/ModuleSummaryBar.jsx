import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useQuery } from "@apollo/client";
import { studentClient } from "../../GraphqlApolloClients";
export default function ModuleSummaryBar({
  props,
  questions,
  studentPoints,
  totalPoints,
  format,
}) {
  const { student } = useContext(StudentAuthContext);

  const {
    data: { getStudentById: studentObject } = {},
    loading: loadingStudentObject,
    studentObjectError,
  } = useQuery(GET_STUDENT_BY_ID, {
    variables: { studentId: student.id },

    client: studentClient,
  });
  console.log(studentObject);
  // console.log(studentObject.quesAnsDict);

  return studentObject ? (
    <nav className="flex flex-shrink-0 items-start justify-start md:max-w-2xl xl:max-w-5xl text-gray-800 border-gray-300 border-r-2 text-left flex-col md:static md:mt-6 md:w-1/6 my-2 w-full cursor-default z-20">
      <p className="mb-2 text-xl text-red-800">Your Progress</p>
      <p className="text-md leading-none mb-6">{format} Module</p>

      <p className="text-lg leading-none">
        {studentPoints} of {totalPoints}
      </p>
      <p className="mb-4 text-md uppercase font-light">Lynx Tokens</p>
      <p className="text-lg uppercase ">
        {studentObject.quesAnsDict.length} of {questions.length}
      </p>
      <p className="mb-4 text-md uppercase font-light leading-snug">
        {format}s Attempted
      </p>
    </nav>
  ) : (
    <div></div>
  );
}

export const GET_STUDENT_BY_ID = gql`
  query getStudentById($studentId: String!) {
    getStudentById(studentId: $studentId) {
      name
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
