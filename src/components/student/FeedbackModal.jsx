import React, { useContext, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";

export default function FeedbackModal({ isOpen, questionFormat, isCorrect }) {
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
          <h3 className="mr-2">{isCorrect && questionFormat ==="Multiple Choice" ? `Correct!` : `Not quite.`}</h3>
          {questionFormat!=="Multiple Choice" && (<h3 className="mr-2">Onward!</h3>)}

          {isCorrect || questionFormat!=="Multiple Choice" ? <GiFallingStar size={32} /> : <IoIosRepeat size={32} />}
        </div>
      </div>
    )
  );
}
