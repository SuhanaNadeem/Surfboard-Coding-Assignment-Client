import { gql, useQuery } from "@apollo/client";
import React from "react";
import { studentClient } from "../../GraphqlApolloClients";

function Progress({ student }) {
  const { data: { getTotalPointsByStudent: totalPoints } = {} } = useQuery(
    GET_TOTAL_POINTS_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: studentClient,
    }
  );
  return totalPoints && student ? (
    <div className="mr-2 md:mb-0 mb-6 w-full md:w-1/2 font-light text-md">
      <h2 className="text-3xl mb-2 font-normal">Progress</h2>
      <div className="flex items-center justify-start w-full text-lg">
        <p className="font-semibold mr-1">
          {student.completedQuestions.length}
        </p>
        <p className="w-full md:truncate">Questions Completed</p>
      </div>
      <div className="flex items-center justify-start w-full text-lg">
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
