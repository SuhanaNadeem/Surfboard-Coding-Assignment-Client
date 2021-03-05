import React from "react";
import { studentClient } from "../../GraphqlApolloClients";
import Mentor from "./Mentor";
import { gql, useQuery } from "@apollo/client";

function Progress({ student }) {
  const { data: { getTotalPointsByStudent: totalPoints } = {} } = useQuery(
    GET_TOTAL_POINTS_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: studentClient,
    }
  );
  return totalPoints && student ? (
    <div className="mr-2 w-1/2 font-light text-md">
      <h2 className="text-3xl mb-2 font-normal">Progress</h2>
      <div className="flex items-center justify-start">
        <p className="font-semibold mr-1">
          {student.completedQuestions.length}
        </p>
        <p>Questions Completed</p>
      </div>
      <div className="flex items-center justify-start">
        <p className="font-semibold mr-1">{totalPoints}</p>
        <p> Lifetime Points</p>
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