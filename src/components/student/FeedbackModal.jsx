import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GiFallingStar } from "react-icons/gi";
import { IoIosRepeat } from "react-icons/io";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import { GET_QUESTION_BY_ID } from "./CompletedQuestion";
import { GET_STUDENT_BY_ID } from "./ModuleSummaryBar";

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
  const { data: { getQuestionById: question } = {} } = useQuery(
    GET_QUESTION_BY_ID,
    {
      variables: { questionId },
      client: studentClient,
    }
  );

  return lazyCompletedQuestions && question ? (
    <div className="mt-2 mx-auto">
      <div className="flex justify-center items-center">
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
