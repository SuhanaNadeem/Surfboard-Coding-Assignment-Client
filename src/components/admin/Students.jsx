import { gql, useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import Student from "./Student";

function Students({ mentor }) {
  const { data: { getStudentsByMentor: students } = {} } = useQuery(
    GET_STUDENTS_BY_MENTOR,
    {
      variables: { mentorId: mentor && mentor.id },
      client: adminClient,
    }
  );
  // console.log(students);
  return students && students.length !== 0 ? (
    <div className="mr-2 flex flex-col w-full mt-4">
      <h2 className="text-xl lg:text-lg mb-2 text-red-800 ">Students</h2>

      {students.map((student, index) => (
        <Student key={index} student={student} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default Students;

export const GET_STUDENTS_BY_MENTOR = gql`
  query getStudentsByMentor($mentorId: String!) {
    getStudentsByMentor(mentorId: $mentorId) {
      id
      name
      email
      orgName
    }
  }
`;
