import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import DashboardStudentCard from "./DashboardStudentCard";
import StudentModal from "./StudentModal";

export default function DashboardStudents({
  props,
  addedStudents,
  mentor,
  selectedStudentId,
}) {
  const { data: { getStudentsByOrgName: allStudents } = {} } = useQuery(
    GET_STUDENTS_BY_ORG_NAME,
    {
      variables: { orgName: mentor.orgName },
      client: mentorClient,
    }
  );

  const [activeStudentId, setActiveStudentId] = useState(selectedStudentId);

  useEffect(() => {
    setActiveStudentId(selectedStudentId);
  }, [setActiveStudentId, selectedStudentId]);
  const [isOpen, setIsOpen] = useState(true);

  function handleStudentClick(selectedStudentId) {
    if (selectedStudentId) {
      setActiveStudentId(selectedStudentId);
      // refetchStudent({ questionId: selectedStudentId });
      props.history.push(`/mentorDashboard/${selectedStudentId}`);
    } else {
      setActiveStudentId("");
      props.history.push(`/mentorDashboard/`);
    }
  }
  return allStudents && allStudents.length > 0 ? (
    <div className="mt-3 flex items-start justify-start flex-col w-full">
      <h6 className="text-3xl mb-1">Students</h6>
      <p className="font-light text-lg leading-snug">
        Add or remove students who have signed up with your organization,{" "}
        {mentor.orgName}. Those highlighted in gray have already been added by
        you.
      </p>
      <div className="w-full pt-4  grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
        {allStudents.map((student, index) => (
          <DashboardStudentCard
            key={index}
            props={props}
            student={student}
            mentor={mentor}
            added={
              addedStudents &&
              addedStudents.some(
                (addedStudent) => addedStudent.id === student.id
              )
            }
            setIsOpen={setIsOpen}
            handleStudentClick={handleStudentClick}
          />
        ))}
      </div>{" "}
      <StudentModal
        props={props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeStudentId={activeStudentId}
        handleStudentClick={handleStudentClick}
      />
    </div>
  ) : (
    <p className="font-light text-left w-full text-lg mt-3">
      Students in {mentor.orgName} will appear here.
    </p>
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
