import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { gql, useQuery } from "@apollo/client";

function Progress({ student }) {
  const { data: { getTotalPointsByStudent: totalPoints } = {} } = useQuery(
    GET_TOTAL_POINTS_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: mentorClient,
    }
  );
  return totalPoints && student ? (
    <div
      className="mr-2 w-1/2 flex flex-col mt-4 font-semibold text-sm 
    "
    >
      <h2 className="text-lg mb-1 text-red-800 ">Progress</h2>
      <div className="flex items-center justify-start ">
        <p className=" mr-1">{student.completedQuestions.length}</p>
        <p className="font-light">Questions Completed</p>
      </div>
      <div className="flex items-center justify-start ">
        <p className=" mr-1">{totalPoints}</p>
        <p className="font-light"> Lifetime Points</p>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Progress;

export const GET_TOTAL_POINTS_BY_STUDENT = gql`
  query getTotalPointsByStudent($studentId: String!) {
    getTotalPointsByStudent(studentId: $studentId)
  }
`;
