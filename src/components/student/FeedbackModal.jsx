import React, { useContext, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";

export default function FeedbackModal({
  props,
  isOpen,
  setIsOpen,
  isCorrect,
  moduleId,
  question,
}) {
  const { student } = useContext(StudentAuthContext);
  // console.log(activeQuestionId);

  // if (isActiveQuestion) {
  //   startQuestion();
  // }

  console.log("inside");
  console.log(isOpen);
  return (
    isOpen && (
      <div className="mt-2 mx-auto">
        <div className="flex justify-center items-center">
          <h3 className="mr-2">
            {isCorrect ? `Correct!` : `Not quite. Try the hint.`}
          </h3>
          {isCorrect ? <GiFallingStar size={32} /> : <IoIosRepeat size={32} />}
        </div>
      </div>
    )
  );
}
