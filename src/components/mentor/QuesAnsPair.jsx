import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { IoMdTrash } from "react-icons/io";
import { mentorClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";
import { GET_STRING_STRING_DICTS_BY_STUDENT } from "./QuesAnsPairs";

export default function QuesAnsPair({
  questionId,
  student,
  answerId,
  stringStringDictId,
}) {
  // const [errors, setErrors] = useState({});

  const {
    data: { getQuestionById: question } = {},
    // refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: mentorClient,
  });
  const {
    data: { getAnswerById: answer } = {},
    // refetch: refetchQuestion,
  } = useQuery(GET_ANSWER_BY_ID, {
    variables: { answerId },
    client: mentorClient,
  });
  const { values, onSubmit } = useForm(deleteStringStringDictCallback, {
    stringStringDictId,
  });

  const [deleteStringStringDict] = useMutation(DELETE_STRING_STRING_DICT, {
    refetchQueries: [
      {
        query: GET_STRING_STRING_DICTS_BY_STUDENT,
        variables: { studentId: student && student.id },
      },
    ],
    // update() {
    //   // console.log(values);

    //   setErrors({});
    // },
    // onError(err) {
    //   // console.log(values);
    //   // console.log(err);
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: values,
    client: mentorClient,
  });

  function deleteStringStringDictCallback() {
    deleteStringStringDict();
  }

  return question && answer ? (
    <div>
      <div className="bg-white h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48  ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center">
        <p className="font-semibold text-sm uppercase">{question.name}</p>
        <p className="font-light text-md lg:text-sm ">{answer.answer}</p>
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-1"
        >
          <button type="submit" className="focus:outline-none">
            <IoMdTrash size={16} />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export const GET_ANSWER_BY_ID = gql`
  query getAnswerById($answerId: String!) {
    getAnswerById(answerId: $answerId) {
      id
      answer
      studentId
      questionId
      createdAt
    }
  }
`;
const DELETE_STRING_STRING_DICT = gql`
  mutation deleteStringStringDict($stringStringDictId: String!) {
    deleteStringStringDict(stringStringDictId: $stringStringDictId) {
      key
      id
      value
      studentId
      createdAt
    }
  }
`;
