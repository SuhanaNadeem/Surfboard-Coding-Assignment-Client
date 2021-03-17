import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import AnswerlessQuestionFeedback from "./AnswerlessQuestionFeedback";
import { GET_QUESTION_BY_ID } from "./CompletedQuestion";
import { GET_STUDENT_BY_ID } from "./ModuleSummaryBar";
import QuestionWithAnswerFeedback from "./QuestionWithAnswerFeedback";

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
    <QuestionWithAnswerFeedback
      questionFormat={question.questionFormat}
      lazyCompletedQuestions={lazyCompletedQuestions}
      markedCorrect={markedCorrect}
      questionId={questionId}
    />
  ) : (
    !lazyCompletedQuestions && question && studentObject && (
      <AnswerlessQuestionFeedback
        questionFormat={question.questionFormat}
        questionId={questionId}
        completedQuestions={studentObject.completedQuestions}
      />
    )
  );
}
