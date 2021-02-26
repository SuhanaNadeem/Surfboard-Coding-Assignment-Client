import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useQuery, gql } from "@apollo/client";
import { GET_STUDENT_BY_ID } from "../student/QuestionModalCard";
import CompletedModules from "./CompletedModules";
import InProgressModules from "./InProgressModules";
import Badges from "./Badges";
import Mentors from "./Mentors";
import QuesAnsPairs from "./QuesAnsPairs";

export default function StudentModal({
  props,
  isOpen,
  setIsOpen,
  activeStudentId,
  handleStudentClick,
}) {
  const {
    data: { getStudentById: student } = {},
    loading: loadingStudent,
    studentError,
    refetch: refetchStudent,
  } = useQuery(GET_STUDENT_BY_ID, {
    variables: { studentId: activeStudentId },
    client: adminClient,
  });

  return isOpen && student ? (
    <>
      <button
        tabIndex="-1"
        onClick={(e) => {
          setIsOpen(false);
          handleStudentClick("");
        }}
        className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
      ></button>

      <div className="fixed mx-auto inset-0 overscroll-contain max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-3xl text-red-800">{student.name}</h3>
          <h3 className="text-xl my-1 font-semibold">{student.orgName}</h3>
          <h3 className="text-lg mb-4 font-light">{student.email}</h3>
        </div>
        <div className="flex mt-2 items-center justify-start">
          <InProgressModules student={student} />
          <CompletedModules student={student} />
        </div>
        <div className="flex mt-4 items-start justify-start">
          <Badges student={student} />
          <Mentors student={student} />
        </div>
        <QuesAnsPairs student={student} />
      </div>
    </>
  ) : (
    <></>
  );
}
