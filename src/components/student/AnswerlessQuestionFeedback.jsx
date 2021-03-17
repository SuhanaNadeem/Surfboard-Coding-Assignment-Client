import React from "react";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";

export default function AnswerlessQuestionFeedback({
  questionFormat,
  questionId,
  completedQuestions,
}) {
  return (
    <div className="mt-3 mx-auto">
      <div className="flex justify-center items-center">
        <h3 className="mr-2">
          {completedQuestions.includes(questionId) &&
          questionFormat === "Multiple Choice"
            ? `Correct!`
            : questionFormat === "Multiple Choice" && `Not quite.`}
        </h3>
        {questionFormat !== "Multiple Choice" && (
          <h3 className="mr-2">Onward!</h3>
        )}

        {completedQuestions.includes(questionId) ||
        questionFormat !== "Multiple Choice" ? (
          <GiFallingStar size={32} />
        ) : (
          <IoIosRepeat size={32} />
        )}
      </div>
    </div>
  );
}
