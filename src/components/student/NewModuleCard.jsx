import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { GiMorphBall } from "react-icons/gi";
import { GrPersonalComputer } from "react-icons/gr";
import { RiWirelessChargingLine } from "react-icons/ri";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import { GET_IN_PROGRESS_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import { useForm } from "../../util/hooks";
import { GET_INCOMPLETE_MODULES_BY_CATEGORY } from "./CategoryCard";

export default function NewModuleCard({ props, categoryName, moduleInfo }) {
  const { student } = useContext(StudentAuthContext);

  const moduleId = moduleInfo.id;
  var studentId;
  if (student) {
    studentId = student.id;
  }
  const categoryId = moduleInfo.categoryId;

  const { values: valuesStatus, onSubmit: onSubmitStatus } = useForm(
    startModuleCallback,
    {
      moduleId,
      studentId,
    }
  );

  const [addInProgressModule] = useMutation(ADD_IN_PROGRESS_MODULE, {
    client: studentClient,
    refetchQueries: [
      {
        query: GET_IN_PROGRESS_MODULES_BY_STUDENT,
        variables: { studentId },
      },
      {
        query: GET_INCOMPLETE_MODULES_BY_CATEGORY,
        variables: { categoryId, studentId },
      },
    ],
    update() {
      props.history.push(`/module/${moduleId}`);
    },

    variables: { moduleId, studentId },
  });

  const [startModule] = useMutation(START_MODULE, {
    client: studentClient,
    update() {
      // startModuleCallback();
      addInProgressModule();
    },
    variables: valuesStatus,
  });
  function startModuleCallback() {
    startModule();
  }
  // startModule is done first onSubmit, and addInProgress is second (called in update of startModule) - its update pushes to new page

  return categoryName && moduleInfo ? (
    <form onSubmit={onSubmitStatus}>
      <button
        type="submit"
        className="w-full focus:outline-none focus:text-blue-500"
      >
        <div className="flex flex-row items-center justify-start w-full">
          {categoryName === "Programming" && <BsCodeSlash size={32} />}
          {categoryName === "Electrical" && (
            <RiWirelessChargingLine size={32} />
          )}
          {categoryName === "Computer-Aided Design" && (
            <GrPersonalComputer size={32} />
          )}
          {categoryName !== "Programming" &&
            categoryName !== "Electrical" &&
            categoryName !== "Computer-Aided Design" && (
              <GiMorphBall size={32} className="w-1/6" />
            )}
          <p className="hover:text-red-800 ml-3 truncate w-5/6 tracking-wide font-normal lg:font-light my-2 md:my-4 text-md text-left">
            {moduleInfo.name}
          </p>
        </div>
      </button>
    </form>
  ) : (
    <div></div>
  );
}
export const START_MODULE = gql`
  mutation startModule($moduleId: String!, $studentId: String!) {
    startModule(moduleId: $moduleId, studentId: $studentId) {
      key
      value
      studentId
      id
    }
  }
`;

export const ADD_IN_PROGRESS_MODULE = gql`
  mutation addInProgressModule($moduleId: String!, $studentId: String!) {
    addInProgressModule(moduleId: $moduleId, studentId: $studentId)
  }
`;
