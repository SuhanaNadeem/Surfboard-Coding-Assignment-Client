import { MentorAuthContext } from "../../context/mentorAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import DashboardStudentCard from "./DashboardStudentCard";
import { mentorClient } from "../../GraphqlApolloClients";

export default function DashboardStudents({ props, addedStudents, mentor }) {
  const {
    data: { getStudentsByOrgName: allStudents } = {},
    loading: loadingAllStudents,
  } = useQuery(GET_STUDENTS_BY_ORG_NAME, {
    variables: { orgName: mentor.orgName },
    client: mentorClient,
  });
  return allStudents && addedStudents ? (
    <div className="flex items-start justify-start flex-col w-full">
      <h6 className="text-3xl mb-1">Students</h6>
      <p className="font-light text-lg">
        Add or remove students who have signed up with your organization,{" "}
        {mentor.orgName}.
      </p>
      {/* Should be able to (1) view the stats from student, inProg + completedMods + answers from admin, 
      (2) add the student, (3) remove the student, (4) see that the student is already "added." */}
      <div className="w-full pt-4  grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
        {allStudents.map((student, index) => (
          <DashboardStudentCard
            key={index}
            props={props}
            student={student}
            added={addedStudents.some(
              (addedStudent) => addedStudent.id === student.id
            )}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
export const GET_STUDENTS_BY_ORG_NAME = gql`
  query getStudentsByOrgName($orgName: String!) {
    getStudentsByOrgName(orgName: $orgName) {
      id
      orgName
      name
      password
      email
      inProgressModules
      completedModules
      badges
      starredModules
      starredQuestions
      completedQuestions
      completedSkills
      mentors
      modulePointsDict {
        key
        value
      }
      quesAnsDict {
        id
        key
        value
      }
      createdAt
      token
    }
  }
`;
