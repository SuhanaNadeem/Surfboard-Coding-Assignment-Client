import React from "react";
import { studentClient } from "../../GraphqlApolloClients";
import Mentor from "./Mentor";
import { gql, useQuery } from "@apollo/client";

function Mentors({ student }) {
  const { data: { getMentorsByStudent: mentors } = {} } = useQuery(
    GET_MENTORS_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: studentClient,
    }
  );

  return mentors && mentors.length !== 0 ? (
    <div className="flex flex-col w-full md:w-1/2">
      <h2 className="text-3xl mb-2 font-normal">Mentors</h2>

      {mentors.map((mentor, index) => (
        <Mentor key={index} mentor={mentor} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default Mentors;

export const GET_MENTORS_BY_STUDENT = gql`
  query getMentorsByStudent($studentId: String!) {
    getMentorsByStudent(studentId: $studentId) {
      id
      name
      email
      orgName
    }
  }
`;
