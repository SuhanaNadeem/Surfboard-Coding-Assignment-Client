import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import QuesAnsPair from "./QuesAnsPair";
import { gql, useQuery } from "@apollo/client";

function QuesAnsPairs({ student }) {
  const {
    data: { getStringStringDictsByStudent: quesAnsPairs } = {},
  } = useQuery(GET_STRING_STRING_DICTS_BY_STUDENT, {
    variables: { studentId: student.id },
    client: mentorClient,
  });
  return quesAnsPairs && quesAnsPairs.length !== 0 ? (
    <div className="mr-2 flex flex-col w-full">
      <h2 className="text-lg text-red-800 ">Questions and Answers</h2>
      <div className="grid grid-flow-col gap-2 items-stretch justify-start pt-2 pb-1 overflow-x-auto relative">
        {quesAnsPairs.map((quesAnsPair, index) => (
          <QuesAnsPair
            key={index}
            questionId={quesAnsPair.key}
            answerId={quesAnsPair.value}
            stringStringDictId={quesAnsPair.id}
            student={student}
          />
        ))}
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
