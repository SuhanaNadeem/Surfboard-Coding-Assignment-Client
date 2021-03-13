import React, { useContext } from "react";
import { IoIosRepeat } from "react-icons/io";
import { StudentAuthContext } from "../../context/studentAuth";

export default function AnswerIncorrect({ props }) {
  const { student } = useContext(StudentAuthContext);
  // console.log(activeQuestionId);

  // if (isActiveQuestion) {
  //   startQuestion();
  // }

  return (
    <div className="mt-2 mx-auto">
      <div className="flex justify-center items-center">
        <h3 className="mr-2">Not quite. Try again!</h3>
        <IoIosRepeat size={32} />
      </div>
    </div>
  );
}
