import { gql, useQuery } from "@apollo/client";
import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";

function Progress({ student }) {
  const { data: { getTotalPointsByStudent: totalPoints } = {} } = useQuery(
    GET_TOTAL_POINTS_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: mentorClient,
    }
  );
  return totalPoints && student ? (
    <div
      className="mr-2 w-full md:w-1/2 flex flex-col mt-2 md:mt-4 font-semibold  text-md lg:text-sm 
    "
    >
      <h2 className="text-xl lg:text-lg mb-1 text-red-800 font-normal">
        Progress
      </h2>
      <div className="flex items-center justify-start w-full">
        <p className=" mr-1">{student.completedQuestions.length}</p>
        <p className="font-normal lg:font-light">Questions Completed</p>
      </div>
      <div className="flex items-center justify-start w-full">
        <p className=" mr-1">{totalPoints}</p>
        <p className="font-normal lg:font-light"> Lifetime Points</p>
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
