import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import Mentor from "./Mentor";
import { gql, useQuery } from "@apollo/client";

function Mentors({ student }) {
  const { data: { getMentorsByStudent: mentors } = {} } = useQuery(
    GET_MENTORS_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: adminClient,
    }
  );
  return mentors && mentors.length !== 0 ? (
    <div className="mr-2 flex flex-col w-full md:w-1/2 mt-2 md:mt-4">
      <h2 className="text-lg mb-2 text-red-800 ">Mentors</h2>

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
