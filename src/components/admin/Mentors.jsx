import { gql, useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import Mentor from "./Mentor";

function Mentors({ student }) {
  const { data: { getMentorsByStudent: mentors } = {} } = useQuery(
    GET_MENTORS_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: adminClient,
    }
  );
  return student ? (
    <div className="mr-2 flex flex-col w-full md:w-1/2 mt-2 md:mt-4">
      <h2 className="text-xl lg:text-lg mb-2 text-red-800 ">Mentors</h2>

      {mentors && mentors.length !== 0 ? (
        mentors.map((mentor, index) => <Mentor key={index} mentor={mentor} />)
      ) : (
        <h2 className="font-light text-md lg:text-sm  leading-tight w-1/2 md:w-full text-left ">
          You will see {student.name}'s mentors when they are added by them.
        </h2>
      )}
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
