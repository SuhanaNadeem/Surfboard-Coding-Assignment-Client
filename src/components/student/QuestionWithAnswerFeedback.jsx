import React from "react";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";

export default function QuestionWithAnswerFeedback({
  lazyCompletedQuestions,
  questionFormat,
  markedCorrect,
  questionId,
}) {
  return (
    <div className="mt-2 mx-auto z-20 bg-white">
      <div className="flex justify-center items-center">
        <h3 className="mr-2">
          {lazyCompletedQuestions.includes(questionId) &&
          questionFormat === "Multiple Choice"
            ? `Correct!`
            : !markedCorrect && markedCorrect !== undefined && `Not quite.`}
        </h3>
        {questionFormat !== "Multiple Choice" &&
          markedCorrect !== undefined &&
          markedCorrect && <h3 className="mr-2">Onward!</h3>}

        {lazyCompletedQuestions.includes(questionId) ||
        questionFormat === "Link" ||
        questionFormat === "Written Response" ? (
          <GiFallingStar size={32} />
        ) : (
          !markedCorrect &&
          markedCorrect !== undefined && <IoIosRepeat size={32} />
        )}
      </div>
    </div>
  );
}
