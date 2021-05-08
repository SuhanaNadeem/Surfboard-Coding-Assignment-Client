import React from "react";
import EnterAnswer from "./EnterAnswer";
import FeedbackModal from "./FeedbackModal";
import Hint from "./Hint";
import SubmitAnswer from "./SubmitAnswer";

export default function AnswerAndSubmitDisplay({
  //   questionId,
  lazyCompletedQuestions,
  markedCorrect,
  hint,
  toggleIsVisible,
  hintVisible,
  submitIsOpen,
  question,
  values,
  onSubmit,
  errors,
  isOpen,
  savedAnswer,
  loadingHandleAnswerPoints,
  completedQuestions,
  onChange,
}) {
  return (
    question.type === "Question" && (
      <div className="flex flex-col w-full">
        <form
          onSubmit={onSubmit}
          className="items-center flex flex-col mt-4 justify-center w-full"

          // {`${
          //   !completedQuestions.includes(question.id) ? `items-center ` : ``
          // }  flex flex-col mt-4 justify-center w-full ${
          //   question.questionFormat === "Multiple Choice" ? `flex-col` : ``
          // }`}
        >
          <EnterAnswer
            loadingHandleAnswerPoints={loadingHandleAnswerPoints}
            errors={errors}
            values={values}
            question={question}
            savedAnswer={savedAnswer}
            completedQuestions={completedQuestions}
            onChange={onChange}
          />

          <SubmitAnswer submitIsOpen={submitIsOpen} question={question} />
        </form>
        <Hint
          hint={hint}
          submitIsOpen={submitIsOpen}
          hintVisible={hintVisible}
          toggleIsVisible={toggleIsVisible}
          loadingHandleAnswerPoints={loadingHandleAnswerPoints}
        />
        {isOpen && (
          <FeedbackModal
            lazyCompletedQuestions={lazyCompletedQuestions}
            questionId={question.id}
            markedCorrect={markedCorrect}
          />
        )}
        {loadingHandleAnswerPoints && (
          <div className="mt-3 flex h-10 mx-auto">
            <svg
              className={`fill-current animate-spin h-4 text-red-800`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}{" "}
      </div>
    )
  );
}
// flex flex-col mt-4 justify-center w-full flex-col
// new: items-center flex flex-col mt-4 justify-center w-full
