import { useQuery } from "@apollo/client";
import React from "react";
import { GrClose } from "react-icons/gr";
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

      <div className="fixed mx-auto inset-0 overscroll-contain overflow-y-auto max-w-2xl my-20 p-8 bg-white z-40 rounded-lg shadow-xl">
        <div className="justify-between flex flex-col h-full">
          <div className="flex flex-col  overflow-y-auto ">
            <div className="w-full items-center justify-center flex flex-col">
              <h3 className="text-3xl text-red-800">{student.name}</h3>
              <h3 className="text-xl my-1 font-semibold">{student.orgName}</h3>
              <h3 className="font-normal text-lg mb-4 lg:font-light">
                {student.email}
              </h3>
            </div>
            <div className="flex flex-col md:flex-row  items-start justify-start">
              <InProgressModules student={student} />
              <CompletedModules student={student} />
            </div>
            <div className="flex flex-col sm:flex-row  items-start justify-start w-full">
              <Badges student={student} />
              <Progress student={student} />
            </div>
            <QuesAnsPairs student={student} />{" "}
          </div>

          <div className="flex mt-6 ">
            <button
              className="mx-auto rounded-md focus:outline-none focus:ring"
              onClick={(e) => {
                setIsOpen(false);
                handleStudentClick("");
              }}
            >
              <GrClose size={32} />
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
