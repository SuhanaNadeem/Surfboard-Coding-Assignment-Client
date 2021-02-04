import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { StudentAuthContext } from "../../context/studentAuth";

import { GiMorphBall } from "react-icons/gi";
import { BsCodeSlash } from "react-icons/bs";
import { RiWirelessChargingLine } from "react-icons/ri";
import { GrPersonalComputer } from "react-icons/gr";
import { useForm } from "../../util/hooks";
import { studentClient } from "../../GraphqlApolloClients";

export default function NewModuleCard({ props, categoryName, moduleInfo }) {
  const { student } = useContext(StudentAuthContext);

  const [errors, setErrors] = useState({});
  const moduleId = moduleInfo.id;
  const studentId = student.id;
  console.log(moduleId);
  console.log(studentId);

  const { values: valuesStatus, onSubmit: onSubmitStatus } = useForm(
    startModuleCallback,
    {
      moduleId,
      studentId,
    }
  );
  const [startModule] = useMutation(START_MODULE, {
    client: studentClient,
    update(proxy, { data: { startModuleData: startingModuleData } }) {
      startModuleCallback();
      setErrors({});
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
      <button
        type="submit"
        onClick={(e) => {
          // console.log(moduleId);
          props.history.push(`/module/${moduleId}`);
          // startModule
          // addInProgressModule
        }}
      >
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

          <p className="ml-6 tracking-wide font-thin my-4 text-md">
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

// export const ADD_IN_PROGRESS_MODULE = gql`
//   mutation addInProgressModule($moduleId: String!) {
//     addInProgressModule(moduleId: $moduleId)
//   }
// `;
