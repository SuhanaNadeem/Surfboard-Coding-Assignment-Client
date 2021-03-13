import React, { useContext } from "react";
import { GiFallingStar } from "react-icons/gi";
import { StudentAuthContext } from "../../context/studentAuth";

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
