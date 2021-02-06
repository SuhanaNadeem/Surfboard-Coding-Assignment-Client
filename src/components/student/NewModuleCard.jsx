import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { StudentAuthContext } from "../../context/studentAuth";

import { GiMorphBall } from "react-icons/gi";
import { BsCodeSlash } from "react-icons/bs";
import { RiWirelessChargingLine } from "react-icons/ri";
import { GrPersonalComputer } from "react-icons/gr";
import { useForm } from "../../util/hooks";
import { studentClient } from "../../GraphqlApolloClients";
import { GET_IN_PROGRESS_MODULES_BY_STUDENT } from "../../pages/student/StudentDashboard";
import { GET_INCOMPLETE_MODULES_BY_CATEGORY } from "./CategoryCard";

export default function NewModuleCard({ props, categoryName, moduleInfo }) {
  const { student } = useContext(StudentAuthContext);

  const [errors, setErrors] = useState({});
  const moduleId = moduleInfo.id;
  const studentId = student.id;
  const categoryId = moduleInfo.categoryId;

  // console.log(moduleId);
  // console.log(studentId);

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
      },
      {
        query: GET_INCOMPLETE_MODULES_BY_CATEGORY,
        variables: { categoryId, studentId },
      },
    ],
    update(proxy, { data: { addInProgressModuleData: addingModuleData } }) {
      setErrors({});
      props.history.push(`/module/${moduleId}`);
    },
    onError(err) {
      console.log(valuesStatus);
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { moduleId },
  });

  const [startModule] = useMutation(START_MODULE, {
    client: studentClient,
    update(proxy, { data: { startModuleData: startingModuleData } }) {
      startModuleCallback();
      setErrors({});
      addInProgressModule();
    },
    onError(err) {
      console.log(valuesStatus);
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: valuesStatus,
  });
  function startModuleCallback() {
    startModule();
  }

  return categoryName && moduleInfo ? (
    <form onSubmit={onSubmitStatus}>
      <button type="submit">
        <div className="flex flex-row items-center justify-start">
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
              <GiMorphBall size={32} />
            )}

          <p className="hover:text-red-800 ml-6 tracking-wide font-thin my-4 text-md">
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
  mutation addInProgressModule($moduleId: String!) {
    addInProgressModule(moduleId: $moduleId)
  }
`;
