import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";
import { GET_STUDENT_BY_ID } from "./ModuleSummaryBar";
import { studentClient } from "../../GraphqlApolloClients";
import { useQuery } from "@apollo/client";
import { GET_QUESTION_BY_ID } from "./CompletedQuestion";

export default function FeedbackModal({
  lazyCompletedQuestions,
  questionId,
  markedCorrect,
}) {
  const { student } = useContext(StudentAuthContext);
  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId: student.id },
      client: studentClient,
    }
  );
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: studentClient,
  });

  return lazyCompletedQuestions && question ? (
    <div className="mt-2 mx-auto">
      <div className="flex justify-center items-center">
        <svg
          class="fill-current animate-spin h-6 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h3 className="mr-2">
          {lazyCompletedQuestions.includes(questionId) &&
          question.questionFormat === "Multiple Choice"
            ? `Correct!`
            : !markedCorrect && markedCorrect !== undefined && `Not quite.`}
        </h3>
        {question.questionFormat !== "Multiple Choice" &&
          markedCorrect !== undefined &&
          markedCorrect && <h3 className="mr-2">Onward!</h3>}

        {lazyCompletedQuestions.includes(questionId) ||
        question.questionFormat === "Link" ||
        question.questionFormat === "Written Response" ? (
          <GiFallingStar size={32} />
        ) : (
          !markedCorrect &&
          markedCorrect !== undefined && <IoIosRepeat size={32} />
        )}
      </div>
    </div>
  ) : (
    !lazyCompletedQuestions && question && studentObject && (
      <div className="mt-2 mx-auto">
        <div className="flex justify-center items-center">
          <h3 className="mr-2">
            {studentObject.completedQuestions.includes(questionId) &&
            question.questionFormat === "Multiple Choice"
              ? `Correct!`
              : question.questionFormat === "Multiple Choice" && `Not quite.`}
          </h3>
          {question.questionFormat !== "Multiple Choice" && (
            <h3 className="mr-2">Onward!</h3>
          )}

          {studentObject.completedQuestions.includes(questionId) ||
          question.questionFormat !== "Multiple Choice" ? (
            <GiFallingStar size={32} />
          ) : (
            <IoIosRepeat size={32} />
          )}
        </div>
      </div>
    )
  );
}
