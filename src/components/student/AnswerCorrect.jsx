import React, { useContext, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";

export default function AnswerCorrect({ props }) {
  const { student } = useContext(StudentAuthContext);
  // console.log(activeQuestionId);

  // if (isActiveQuestion) {
  //   startQuestion();
  // }

  return (
    <div className="mt-2 mx-auto">
      <div className="flex justify-center items-center">
        <h3 className="mr-2">Correct!</h3>
        <GiFallingStar size={32} />
      </div>
    </div>
  );
}
