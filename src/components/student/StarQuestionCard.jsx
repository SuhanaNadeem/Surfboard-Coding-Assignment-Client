import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { StudentAuthContext } from "../../context/studentAuth";
import { studentClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { GET_STUDENT_BY_ID } from "./ModuleSummaryBar";

export default function StarQuestionCard({ props, questionId, studentObject }) {
  const { student } = useContext(StudentAuthContext);
  if (studentObject) {
    // console.log("completed questions in starq");
    // console.log(studentObject.starredQuestions);
  }
  const { values, onSubmit, setValues } = useForm(handleStarQuestionCallback, {
    questionId,
  });

  useEffect(() => {
    if (questionId) {
      // console.log("changed");
      setValues({ questionId });
    }
  }, [questionId, setValues]);

  const [handleStarQuestion] = useMutation(HANDLE_STAR_QUESTION, {
    client: studentClient,
    refetchQueries: [
      {
        query: GET_STUDENT_BY_ID,
        variables: { studentId: student && student.id },
      },
    ],

    update(proxy, { data: { handleStarQuestion: handleStarQuestionData } }) {},
    onError(err) {
      // console.log(err);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function handleStarQuestionCallback() {
    handleStarQuestion();
  }

  return studentObject ? (
    <form className="mb-2 flex justify-center items-center" onSubmit={onSubmit}>
      <button id="starQuestion" type="submit" className="focus:outline-none">
        {studentObject.starredQuestions.includes(questionId) ? (
          <BsStarFill size={16} />
        ) : (
          <BsStar size={16} />
        )}
      </button>
    </form>
  ) : (
    <></>
  );
}

export const HANDLE_STAR_QUESTION = gql`
  mutation handleStarQuestion($questionId: String!) {
    handleStarQuestion(questionId: $questionId)
  }
`;
