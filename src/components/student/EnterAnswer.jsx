import React from "react";

export default function EnterAnswer({
  onChange,
  loadingHandleAnswerPoints,
  errors,
  values,
  question,
  savedAnswer,
  completedQuestions,
}) {
  return question.questionFormat === "Multiple Choice" ? (
    <div
      className={`flex flex-col text-md font-normal lg:font-light items-start justify-start md:items-start md:justify-center text-left ${
        errors.answer ? "text-red-800" : ""
      }`}
    >
      <div>
        <input
          name="answer"
          value="A"
          onChange={onChange}
          error={errors.type ? "true" : "false"}
          type="radio"
          id="A"
          className="mr-2"
          checked={
            (completedQuestions.includes(question.id) && savedAnswer === "A") ||
            values.answer === "A"
              ? true
              : false
          }
        />
        <label htmlFor="A">{question.optionA}</label>
      </div>
      <div>
        <input
          name="answer"
          value="B"
          onChange={onChange}
          error={errors.type ? "true" : "false"}
          type="radio"
          id="B"
          className="mr-2"
          checked={
            (completedQuestions.includes(question.id) && savedAnswer === "B") ||
            values.answer === "B"
              ? true
              : false
          }
          // checked={true}
        />
        <label htmlFor="B">{question.optionB}</label>
      </div>
      <div>
        <input
          name="answer"
          value="C"
          onChange={onChange}
          error={errors.type ? "true" : "false"}
          type="radio"
          id="C"
          checked={
            (completedQuestions.includes(question.id) && savedAnswer === "C") ||
            values.answer === "C"
              ? true
              : false
          }
          className="mr-2"
        />
        <label htmlFor="C">{question.optionC}</label>
      </div>
      <div>
        <input
          name="answer"
          value="D"
          onChange={onChange}
          error={errors.type ? "true" : "false"}
          type="radio"
          id="D"
          checked={
            (completedQuestions.includes(question.id) && savedAnswer === "D") ||
            values.answer === "D"
              ? "checked"
              : ""
          }
          className="mr-2"
        />
        <label htmlFor="D">{question.optionD}</label>
      </div>
      {errors.answer && (
        <p className="font-light text-red-800">
          <b>&#33;</b> {errors.answer}
        </p>
      )}
    </div>
  ) : (
    <input
      className="md:w-3/4 shadow appearance-none border rounded w-full font-normal lg:font-light  py-1 px-2 text-gray-700 leading-tight focus:outline-none"
      name="answer"
      placeholder="Enter an answer"
      value={values.answer}
      onChange={onChange}
      type="text"
    />
  );
}
