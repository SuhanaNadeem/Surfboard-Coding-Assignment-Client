import { useQuery } from "@apollo/client";
import React from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_STUDENT_BY_ID } from "../student/QuestionModalCard";
import Badges from "./Badges";
import CompletedModules from "./CompletedModules";
import InProgressModules from "./InProgressModules";
import Progress from "./Progress";
import QuesAnsPairs from "./QuesAnsPairs";

export default function StudentModal({
  props,
  isOpen,
  setIsOpen,
  activeStudentId,
  handleStudentClick,
}) {
  const { data: { getStudentById: student } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId: activeStudentId },
      client: mentorClient,
    }
  );

  return isOpen && student ? (
    <>
      <button
        tabIndex="-1"
        onClick={(e) => {
          setIsOpen(false);
          handleStudentClick("");
        }}
        className="fixed inset-0 h-auto w-full bg-gray-800 opacity-50 cursor-default z-20"
      ></button>

      <div className="fixed mx-2 md:mx-auto inset-0 overscroll-contain overflow-y-auto max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-3xl text-red-800">{student.name}</h3>
          <h3 className="text-xl my-1 font-semibold">{student.orgName}</h3>
          <h3 className="text-lg mb-4 font-light">{student.email}</h3>
        </div>
        <div className="flex items-start justify-start flex-col md:flex-row">
          <InProgressModules student={student} />
          <CompletedModules student={student} />
        </div>
        <div className="flex items-start justify-start flex-col md:flex-row">
          <Badges student={student} />
          <Progress student={student} />
        </div>
        <QuesAnsPairs student={student} />
      </div>
    </>
  ) : (
    <></>
  );
}
