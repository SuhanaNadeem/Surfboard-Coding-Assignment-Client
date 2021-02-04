import React, { useState } from "react";

import { GiMorphBall } from "react-icons/gi";
import { BsCodeSlash } from "react-icons/bs";
import { RiWirelessChargingLine } from "react-icons/ri";
import { GrPersonalComputer } from "react-icons/gr";
import { useForm } from "../../util/hooks";

export default function NewModuleCard({ props, categoryName, moduleInfo }) {
  // const [errors, setErrors] = useState({});

  // const { values: valuesStatus, onSubmit: onSubmitStatus } = useForm(
  //   startModuleCallback,
  //   {
  //     moduleId,
  //   }
  // );
  // const [startModule] = useMutation(START_MODULE, {
  //   client: studentClient,

  //   update(proxy, { data: { moduleId: moduleId } }) {
  //     setErrors({});
  //   },
  //   onError(err) {
  //     console.log(valuesStatus);
  //     console.log(err);
  //     setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //   },
  //   variables: valuesStatus,
  // });
  // function startModuleCallback() {
  //   startModule();
  // }

  // // form with onSubmit={onSubmitStatus}, with button inside

  return categoryName && moduleInfo && props ? (
    <button
      onClick={(e) => {
        console.log(moduleInfo.id);
        console.log(props);
        props.history.push(`/module/${moduleInfo.id}`);
        // startModule
        // addInProgressModule
      }}
    >
      <div className="flex flex-row items-center justify-start">
        {categoryName === "Programming" && <BsCodeSlash size={32} />}
        {categoryName === "Electrical" && <RiWirelessChargingLine size={32} />}
        {categoryName === "Computer-Aided Design" && (
          <GrPersonalComputer size={32} />
        )}

        {categoryName !== "Programming" &&
          categoryName !== "Electrical" &&
          categoryName !== "Computer-Aided Design" && <GiMorphBall size={32} />}

        <p className="ml-6 tracking-wide font-thin my-4 text-md">
          {moduleInfo.name}
        </p>
      </div>
    </button>
  ) : (
    <div></div>
  );
}
