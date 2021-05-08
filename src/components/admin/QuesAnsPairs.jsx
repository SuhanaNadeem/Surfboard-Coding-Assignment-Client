import { gql, useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import QuesAnsPair from "./QuesAnsPair";

function QuesAnsPairs({ student }) {
  const {
    data: { getStringStringDictsByStudent: quesAnsPairs } = {},
  } = useQuery(GET_STRING_STRING_DICTS_BY_STUDENT, {
    variables: { studentId: student && student.id },
    client: adminClient,
  });
  // console.log(quesAnsPairs);
  // console.log(quesAnsPairs.length);
  // console.log(quesAnsPairs && quesAnsPairs.length > 0);
  return student ? (
    <div className="mr-2 mt-4 flex flex-col w-full">
      <h2 className="text-xl lg:text-lg text-red-800 ">
        Questions and Answers
      </h2>
      <div className="grid grid-flow-col gap-2 items-stretch justify-start pt-2 pb-1 overflow-x-auto relative">
        {quesAnsPairs && quesAnsPairs.length !== 0 ? (
          quesAnsPairs.map((quesAnsPair, index) => (
            <QuesAnsPair
              key={index}
              questionId={quesAnsPair.key}
              answerId={quesAnsPair.value}
              stringStringDictId={quesAnsPair.id}
              student={student}
            />
          ))
        ) : (
          <h2 className="font-normal lg:font-light text-md lg:text-sm  leading-tight w-full text-left ">
            You will see {student.name}'s answers to various questions here once
            they submit them.
          </h2>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default QuesAnsPairs;

export const GET_STRING_STRING_DICTS_BY_STUDENT = gql`
  query getStringStringDictsByStudent($studentId: String!) {
    getStringStringDictsByStudent(studentId: $studentId) {
      key
      value
      id
      createdAt
      studentId
    }
  }
`;
